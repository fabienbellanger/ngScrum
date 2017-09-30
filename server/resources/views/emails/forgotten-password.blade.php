<h1>{{ __('messages.hello') }}</h1>
<p>
	{{ __('messages.click.link') }}
	<br>
	<a href="{{ env('APP_CLIENT_URL') }}/{{ $token }}">{{ __('messages.new.password') }}<a>
</p>