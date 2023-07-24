<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'reason' => 'required|string',
        ]);

        $booking = Booking::create([
            'date' => $request->input('date'),
            'reason' => $request->input('reason'),
        ]);

        return response()->json($booking, 201);
    }

    public function index(Request $request)
    {
        $query = Booking::query();

        if ($request->query('future')) {
            $query->where('date', '>', now());
        } elseif ($request->query('past')) {
            $query->where('date', '<', now());
        }

        $bookings = $query->get();

        return response()->json($bookings, 200);
    }
}
