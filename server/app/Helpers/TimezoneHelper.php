<?php

    namespace App\Helpers;

    /**
     * Classe pour gérer les dates et heures
     *
     * @author  Fabien Bellanger
     * @package App\Helpers
     */
    class TimezoneHelper
    {
        /**
         * Converti une date locale en date avec le timezone UTC
         *
         * @author Fabien Bellanger
         * @param  string  $timezone
         * @param  string  $date
         * @param  string  $time
         * @param  string  $format
         * @return DateTime|null
         */
        public function getUTCDatetime($timezone, $date, $time='00:00:00', $format=null)
        {
            $timezoneFrom = new \DateTimeZone($timezone);
            $timezoneUTC  = new \DateTimeZone('UTC');
            $dateTab      = explode('-', $date);
            $timeTab      = explode(':', $time);

            $datetime = new \DateTime();
            $datetime->setTimezone($timezoneFrom);
            $datetime->setDate(intval($dateTab[0]), intval($dateTab[1]), intval($dateTab[2]));
            $datetime->setTime(intval($timeTab[0]), intval($timeTab[1]), intval($timeTab[2]));
            $datetime->setTimezone($timezoneUTC);

            return ($format) ? $datetime->format($format) : $datetime;
        }

        /**
         * Converti une date locale en date avec le timezone UTC
         *
         * @author Fabien Bellanger
         * @param  string  $timezone
         * @param  string  $date
         * @param  string  $time
         * @return DateTime|null
         */
        public function getUTCDatetime2($timezone, $datetime=null, $format=null)
        {
            if ($datetime)
            {
                $datetimeTab = explode(' ', $datetime);

                if (count($datetimeTab) === 2)
                {
                    return $this->getUTCDatetime($timezone, $datetimeTab[0], $datetimeTab[1], $format);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        /**
         * Converti une date UTC en date locale
         *
         * @author Fabien Bellanger
         * @param  string  $timezone
         * @param  string  $date
         * @param  string  $time
         * @return DateTime|null
         */
        public function getLocalDatetime($timezone, $date, $time='00:00:00', $format=null)
        {
            $timezoneTo  = new \DateTimeZone($timezone);
            $timezoneUTC = new \DateTimeZone('UTC');
            $dateTab     = explode('-', $date);
            $timeTab     = explode(':', $time);

            $datetime = new \DateTime();
            $datetime->setTimezone($timezoneUTC);
            $datetime->setDate(intval($dateTab[0]), intval($dateTab[1]), intval($dateTab[2]));
            $datetime->setTime(intval($timeTab[0]), intval($timeTab[1]), intval($timeTab[2]));
            $datetime->setTimezone($timezoneTo);

            return ($format) ? $datetime->format($format) : $datetime;
        }

        /**
         * Converti une date UTC en date locale
         *
         * @author Fabien Bellanger
         * @param  string  $timezone
         * @param  string  $date
         * @param  string  $time
         * @return DateTime|null
         */
        public function getLocalDatetime2($timezone, $datetime=null, $format=null)
        {
            if ($datetime)
            {
                $datetimeTab = explode(' ', $datetime);

                if (count($datetimeTab) === 2)
                {
                    return $this->getLocalDatetime($timezone, $datetimeTab[0], $datetimeTab[1], $format);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
    