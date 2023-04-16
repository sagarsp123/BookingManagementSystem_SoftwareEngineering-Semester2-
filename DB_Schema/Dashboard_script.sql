#View User Profile
select first_name, last_name, phone_number, email, id, photo_url from users where id = 1;

#Total Hotel Stays
select count(distinct hotel_id) AS TotalHotelStays from bookings where user_id = 2;

# Total Rooms Booked
select Count(*) as TotalRoomsBooked
from bookings
where user_id = 1;

#Booking History Details

SELECT ROW_NUMBER() OVER () as BookingNumber, hotels.name as HotelName, COUNT(*) AS NumberOfRoomsBooked,bookings.checkin, bookings.checkout
FROM bookings
INNER JOIN hotels ON bookings.hotel_id = hotels.id
INNER JOIN payments ON bookings.payment_id = payments.id
where bookings.user_id = 1
GROUP BY hotels.name, bookings.checkin, bookings.checkout, bookings.payment_id;


#Transaction History

SELECT ROW_NUMBER() OVER () as TransactionNumber, hotels.name as HotelName, COUNT(*) AS NumberOfRoomsBooked, bookings.checkin, bookings.checkout, payments.amount, payments.card
FROM bookings
INNER JOIN hotels ON bookings.hotel_id = hotels.id
INNER JOIN payments ON bookings.payment_id = payments.id
where bookings.user_id = 1
GROUP BY hotels.name, bookings.checkin, bookings.checkout, bookings.payment_id;
