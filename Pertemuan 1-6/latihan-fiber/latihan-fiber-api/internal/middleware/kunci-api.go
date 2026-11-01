package middleware

import (
	"crypto/subtle"
	"strings"

	"github.com/gofiber/fiber/v3"
)

func KunciApi(kunciValid string) fiber.Handler {
	return func(c fiber.Ctx) error {
		kunciDikirim := strings.TrimSpace(c.Get("X-Api-Key"))
		cocok := subtle.ConstantTimeCompare([]byte(kunciDikirim), []byte(kunciValid)) == 1
		if kunciValid == "" || !cocok {
			return fiber.NewError(fiber.StatusUnauthorized, "API key tidak valid atau tidak disertakan")
		}
		return c.Next()
	}
}