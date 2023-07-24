<?php

// database/factories/BookingFactory.php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition()
    {
        return [
            'date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'reason' => $this->faker->sentence,
        ];
    }
}
