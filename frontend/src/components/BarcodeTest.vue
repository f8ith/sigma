<template>
  <div>
    <button
      type="button"
      class="mx-2 btn text-white btn-warning"
      @click="decode()"
    >
      Take Attendance
    </button>

    <div ref="scanner">
      <canvas
        className="drawingBuffer"
        style="position: relative; top: 0px; border: 3px solid green"
        width="640"
        height="480"
      />
    </div>
  </div>
  <!--input
    type="file"
    ref="file"
    style="display: none"
    @click="decode($refs.file.files[0])"
    capture
  /-->
</template>

<script>
import { defineComponent, ref } from "vue";
import Quagga from "@ericblade/quagga2";

export default defineComponent({
  name: "BarcodeTest",
  setup() {
    const scanner = ref(null);
    const decode = () => {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scanner._rawValue,
          },
          decoder: {
            readers: ["code_39_reader"],
          },
        },
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
        }
      );
    };

    return { scanner, decode };
  },
});
</script>
