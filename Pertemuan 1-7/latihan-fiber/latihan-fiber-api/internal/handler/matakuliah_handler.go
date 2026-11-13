package handler

import (
	"errors"
	"strconv"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"

	"latihan-fiber-api/internal/model"
	"latihan-fiber-api/internal/repository"
)

func cariMatakuliah(c fiber.Ctx) (model.Matakuliah, error) {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return model.Matakuliah{}, fiber.NewError(fiber.StatusBadRequest, "ID harus berupa angka")
	}
	mk, err := repository.AmbilMatakuliahPerId(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return mk, fiber.NewError(fiber.StatusNotFound, "Matakuliah tidak ditemukan")
		}
		return mk, fiber.NewError(fiber.StatusInternalServerError, "Gagal mengambil data")
	}
	return mk, nil
}

func DaftarMatakuliah(c fiber.Ctx) error {
	daftar, err := repository.AmbilSemuaMatakuliah()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Gagal mengambil data")
	}
	return c.JSON(fiber.Map{"sukses": true, "data": daftar})
}

func DetailMatakuliah(c fiber.Ctx) error {
	mk, err := cariMatakuliah(c)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{"sukses": true, "data": mk})
}

func BuatMatakuliah(c fiber.Ctx) error {
	var permintaan PermintaanMatakuliah
	if err := c.Bind().Body(&permintaan); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Format body tidak valid")
	}
	mk := model.Matakuliah{
		Kode:     permintaan.Kode,
		Nama:     permintaan.Nama,
		Sks:      permintaan.Sks,
		Semester: permintaan.Semester,
	}
	if err := repository.SimpanMatakuliah(&mk); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Gagal menyimpan data, periksa keunikan kode")
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"sukses": true,
		"pesan":  "Data matakuliah berhasil dibuat",
		"data":   mk,
	})
}

func PerbaruiMatakuliah(c fiber.Ctx) error {
	mk, err := cariMatakuliah(c)
	if err != nil {
		return err
	}
	var permintaan PermintaanMatakuliah
	if err := c.Bind().Body(&permintaan); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Format body tidak valid")
	}
	if permintaan.Kode != "" {
		mk.Kode = permintaan.Kode
	}
	if permintaan.Nama != "" {
		mk.Nama = permintaan.Nama
	}
	if permintaan.Sks > 0 {
		mk.Sks = permintaan.Sks
	}
	if permintaan.Semester > 0 {
		mk.Semester = permintaan.Semester
	}
	if err := repository.PerbaruiMatakuliah(&mk); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Gagal memperbarui data")
	}
	return c.JSON(fiber.Map{
		"sukses": true,
		"pesan":  "Data matakuliah berhasil diperbarui",
		"data":   mk,
	})
}

func HapusMatakuliah(c fiber.Ctx) error {
	mk, err := cariMatakuliah(c)
	if err != nil {
		return err
	}
	if err := repository.HapusMatakuliah(&mk); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Gagal menghapus data")
	}
	return c.JSON(fiber.Map{"sukses": true, "pesan": "Data matakuliah berhasil dihapus"})
}