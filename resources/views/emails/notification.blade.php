<x-mail::message>
# {{ $title }}

Olá, {{ $recipient->name }}!

{{ $message }}

@if($url)
<x-mail::button :url="$url">
Acessar
</x-mail::button>
@endif

Obrigado por usar o sistema {{ config('app.name') }}.
</x-mail::message>
