<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function create(Request $request){
        $user = $request->input('user');
        $course = $request->input('course');

        $order = Order::create([
            'user_id'=>$user['id'],
            'course_id'=>$course['id']
        ]);

        $transactionDetail = [
            'order_id' =>$order->id,
            'gross_amount' => $course['price']
        ];

        $itemDetails = [
            [
                'id' => $course['id'],
                'price' => $course['price'],
                'quantity' => 1,
                'name' => $course['name'],
                'category' => 'Online Course',
            ]
            ];

            $customerDetails = [
                'first_name' => $user['name'],
                'email' => $user['email'],
                
            ];
        $midtransParams = [
            'transaction_details' => $transactionDetail,
            'item_details' => $itemDetails,
            'customer_details' =>$customerDetails
        ];

        $midtransSnapUrl = $this->getMidtransSnapUrl($midtransParams);
        return $midtransSnapUrl;
        // return response()->json($order);

    }


    private function getMidtransSnapUrl($params){
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$isProduction = (bool) env('MIDTRANS_PRODUCTION');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = (bool) env('MIDTRANS_3DS');

        $snapUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        return $snapUrl;
    }
}
