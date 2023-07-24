<?php

namespace Tests\Feature;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_booking()
    {
        $data = [
            'date' => '2023-07-25 10:00:00',
            'reason' => 'Meeting with a client',
        ];

        $response = $this->postJson('/api/bookings', $data);

        $response->assertStatus(201)
            ->assertJson([
                'date' => $data['date'],
                'reason' => $data['reason'],
            ]);

        $this->assertDatabaseHas('bookings', $data);
    }

    public function test_can_list_bookings()
    {
        Booking::factory()->create([
            'date' => '2023-07-25 10:00:00',
            'reason' => 'Meeting with a client',
        ]);

        $response = $this->getJson('/api/bookings');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }
}
