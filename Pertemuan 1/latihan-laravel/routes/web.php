<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', function () {
    return view('welcome', [
        'nama' => 'M.Fawaz Akbar',
        'nim'  => 'H1H024046',
    ]);
});
