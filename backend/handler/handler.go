package handler

import (
	"github.com/f8ith/sigma/article"
	"github.com/f8ith/sigma/user"
)

type Handler struct {
	userStore    user.Store
	articleStore article.Store
}

func NewHandler(us user.Store, as article.Store) *Handler {
	return &Handler{
		userStore:    us,
		articleStore: as,
	}
}
