<?php
    namespace App\Facades;

    use Illuminate\Support\Facades\Facade;

    class TimezoneFacade extends Facade
    {
        protected static function getFacadeAccessor()
        {
            return 'timezonehelper';
        }
    }
