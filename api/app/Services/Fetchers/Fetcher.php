<?php

namespace App\Services\Fetchers;

interface Fetcher
{
    public function fetch(): array;
}
