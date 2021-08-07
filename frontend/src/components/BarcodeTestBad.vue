<template>
  <div>
    <div id="interactive" class="viewport"></div>
    {{ code }}
  </div>
</template>

<style lang="scss">
#interactive.viewport {
  width: 640px;
  height: 480px;
}
#interactive.viewport canvas,
video {
  float: left;
  width: 640px;
  height: 480px;
}
#interactive.viewport canvas.drawingBuffer,
video.drawingBuffer {
  margin-left: -640px;
}
@media (max-width: 603px) {
  #interactive.viewport {
    width: 100vw;
    height: auto;
    overflow: hidden;
  }
  #interactive.viewport canvas,
  video {
    width: 100vw;
    height: auto;
  }
  #interactive.viewport canvas.drawingBuffer,
  video.drawingBuffer {
    margin-left: -100vw;
  }
}
</style>

<script>
import Quagga from "@ericblade/quagga2";
export default {
  data() {
    return {
      code: []
    };
  },
  methods: {
    async checkDevice() {
      let md = navigator.mediaDevices;
      if (!md || !md.enumerateDevices) return false;
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some((device) => "videoinput" === device.kind);
    },
    initQuagga() {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            area: {
              top: "35%",
              right: "10%",
              left: "10%",
              bottom: "35%"
            }
          },
          locate: false,
          decoder: {
            readers: ["code_39_reader"]
          }
        },
        (err) => {
          if (err) {
            return;
          }
          // this.checkCapabilities();
          this.startQuagga();
        }
      );
    },
    // checkCapabilities(){
    //   var track = Quagga.CameraAccess.getActiveTrack();
    //   var capabilities = {};
    //   if (typeof track.getCapabilities === 'function') {
    //       capabilities = track.getCapabilities();
    //   }
    //   this.applySettingsVisibility('zoom', capabilities.zoom);
    //   this.applySettingsVisibility('torch', capabilities.torch);
    // },
    // applySetting: function(setting, value) {
    //     var track = Quagga.CameraAccess.getActiveTrack();
    //     if (track && typeof track.getCapabilities === 'function') {
    //         switch (setting) {
    //         case 'zoom':
    //             return track.applyConstraints({advanced: [{zoom: parseFloat(value)}]});
    //         case 'torch':
    //             return track.applyConstraints({advanced: [{torch: !!value}]});
    //         }
    //     }
    // },
    startQuagga() {
      Quagga.start();
      Quagga.onProcessed(function (result) {
        let drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute("width")),
              parseInt(drawingCanvas.getAttribute("height"))
            );
            result.boxes
              .filter(function (box) {
                return box !== result.box;
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: "#00F",
                  lineWidth: 2
                });
              });
          }
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: "#008",
              lineWidth: 2
            });
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: "x", y: "y" },
              drawingCtx,
              { color: "red", lineWidth: 3 }
            );
          }
        }
      });
      Quagga.onDetected(this.onDetected);
    },
    onDetected(data) {
      let barCodeData = data.codeResult.code;
      this.$emit("barcodeDetected", barCodeData);
    }
  },
  emits: ["barcodeDetected"],
  async mounted() {
    let data = await this.checkDevice();
    if (data) {
      this.initQuagga();
    }
  },
  beforeUnmount() {
    Quagga.stop();
  }
};
</script>
