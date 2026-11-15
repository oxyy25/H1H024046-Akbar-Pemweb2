package model

import "time"

type TokenDaftarHitam struct {
	ID              uint      `gorm:"primaryKey"`
	Jti             string    `gorm:"size:64;uniqueIndex"`
	KedaluwarsaPada time.Time `gorm:"index"`
	CreatedAt       time.Time
}