-- ==========================
-- 1. Admin Table
-- ==========================
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 2. Driver Table
-- ==========================
CREATE TABLE IF NOT EXISTS driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    license_no VARCHAR(50) NOT NULL UNIQUE,
    phone_no VARCHAR(15),
    role ENUM('driver') DEFAULT 'driver',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 3. Bus Table
-- ==========================
CREATE TABLE IF NOT EXISTS bus (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    plate_no VARCHAR(20) NOT NULL UNIQUE,
    model_no VARCHAR(50),
    capacity INT NOT NULL,
    added_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (added_by) REFERENCES admin(admin_id)
);

-- ==========================
-- 4. Petrol Table
-- ==========================
CREATE TABLE IF NOT EXISTS petrol (
    petrol_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('petrol') DEFAULT 'petrol',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 5. Petrol Pump Table
-- ==========================
CREATE TABLE IF NOT EXISTS petrol_pump (
    pump_id INT AUTO_INCREMENT PRIMARY KEY,
    pump_name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- 6. Fuel Refill Table (missing from your desc but likely exists)
-- ==========================
CREATE TABLE IF NOT EXISTS fuel_refill (
    refill_id INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    driver_id INT NOT NULL,
    pump_id INT NOT NULL,
    petrol_litre DECIMAL(10,2) NOT NULL,
    refill_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bus_id) REFERENCES bus(bus_id),
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    FOREIGN KEY (pump_id) REFERENCES petrol_pump(pump_id)
);

-- ==========================
-- 7. Bills Table
-- ==========================
CREATE TABLE IF NOT EXISTS bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    petrol_id INT NOT NULL,
    bill_photo VARCHAR(255) NOT NULL,
    qr_code VARCHAR(255),
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (petrol_id) REFERENCES petrol(petrol_id)
);

-- ==========================
-- 8. Trip Log Table
-- ==========================
CREATE TABLE IF NOT EXISTS trip_log (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id VARCHAR(50),
    bus_id VARCHAR(50),
    trip_date DATE NOT NULL,
    odometer_in INT,
    odometer_out INT,
    petrol_in_litre DECIMAL(10,2),
    petrol_out_litre DECIMAL(10,2),
    trip_status ENUM('out','return') DEFAULT 'out'
);
