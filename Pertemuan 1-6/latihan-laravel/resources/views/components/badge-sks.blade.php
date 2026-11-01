@props(['sks'])

@php
    $badgeClass = $sks < 3 ? 'bg-warning text-dark' : 'bg-success';
@endphp

<span {{ $attributes->merge(['class' => "badge {$badgeClass}"]) }}>
    {{ $sks }} SKS
</span>