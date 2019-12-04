Web application which outputs QR codes for a parking lot and then reads them to determine how long a car has stayed in the lot.

**How to run:**
Install xampp and add this project to xampp/htdocs (root). You can now run this application by visiting localhost.com/QRParkingLot. Make sure you have internet connection as this application will make calls to http://goqr.me/.

Frontend: HTML, CSS, Javascript
Backend: PHP, SQL, xampp

**Set-up DB:**
Tablename: license_plates  
Columns: lincensePlates (varchar), startTIme (datetime)

Tablename: archive  
Columns: lincensePlates (varchar), startTime (datetime), endTime (datetime)

---

Credit to:
https://github.com/LazarSoft/jsqrcode
http://goqr.me/
