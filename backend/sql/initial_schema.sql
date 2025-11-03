-- Admin Table
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver Table
CREATE TABLE IF NOT EXISTS driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    license_no VARCHAR(50) UNIQUE NOT NULL,
    phone_no VARCHAR(15),
    role ENUM('driver') DEFAULT 'driver',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Petrol Pump Table
CREATE TABLE IF NOT EXISTS petrol_pump (
    pump_id INT AUTO_INCREMENT PRIMARY KEY,
    pump_name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bus Table
CREATE TABLE IF NOT EXISTS bus (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    plate_no VARCHAR(20) UNIQUE NOT NULL,
    model_no VARCHAR(50),
    capacity INT,
    added_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (added_by) REFERENCES admin(admin_id) ON DELETE SET NULL
);

-- Trip Log Table
CREATE TABLE IF NOT EXISTS trip_log (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    bus_id INT NOT NULL,
    trip_date DATE NOT NULL,
    odometer_in INT NOT NULL,
    odometer_out INT NOT NULL,
    petrol_in_litre DECIMAL(8,2) NOT NULL,
    petrol_out_litre DECIMAL(8,2) NOT NULL,
    mileage DECIMAL(8,2) GENERATED ALWAYS AS (
        CASE
            WHEN (odometer_out - odometer_in) > 0 AND (petrol_in_litre - petrol_out_litre) > 0
            THEN (odometer_out - odometer_in) / (petrol_in_litre - petrol_out_litre)
            ELSE NULL
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE CASCADE
);


-- Fuel Refill Table
CREATE TABLE IF NOT EXISTS fuel_refill (
    refill_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    bus_id INT NOT NULL,
    pump_id INT NOT NULL,
    refill_date DATE NOT NULL,
    litres DECIMAL(8,2) NOT NULL,
    price_per_litre DECIMAL(8,2) NOT NULL,
    total_cost DECIMAL(12,2) GENERATED ALWAYS AS (litres * price_per_litre) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE CASCADE,
    FOREIGN KEY (pump_id) REFERENCES petrol_pump(pump_id) ON DELETE CASCADE
);

-- Payment Table
CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    pump_id INT NOT NULL,
    month_year VARCHAR(7) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    payment_date DATE,
    paid_by INT,
    FOREIGN KEY (pump_id) REFERENCES petrol_pump(pump_id) ON DELETE CASCADE,
    FOREIGN KEY (paid_by) REFERENCES admin(admin_id) ON DELETE SET NULL
);
