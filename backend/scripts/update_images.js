require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const Car = require("../models/carModel");

const imageMapping = {
  "Maruti Suzuki Fronx": {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/2023_Suzuki_Fronx_1.5_Front.jpg",
    gallery: ["https://upload.wikimedia.org/wikipedia/commons/e/e5/2023_Suzuki_Fronx_1.5_Front.jpg"]
  },
  "Maruti Suzuki Brezza": {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Maruti_Suzuki_Brezza_ZXi%2B_front_view.jpg",
    gallery: ["https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Maruti_Suzuki_Brezza_ZXi%2B_front_view.jpg"]
  },
  "Tata Curvv": {
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80"]
  },
  "Tata Harrier": {
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/2020_Tata_Nexon_facelift_front_view.jpg", // high quality Indian SUV
    gallery: ["https://upload.wikimedia.org/wikipedia/commons/f/fb/2020_Tata_Nexon_facelift_front_view.jpg"]
  },
  "Tata Safari": {
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80"]
  },
  "Hyundai Venue": {
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80"]
  },
  "Hyundai Verna": {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"]
  },
  "Kia Carens": {
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80"]
  },
  "Mahindra Scorpio N": {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80"]
  },
  "Toyota Fortuner": {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Toyota_Fortuner_Legender_2.8_Front.jpg",
    gallery: ["https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Toyota_Fortuner_Legender_2.8_Front.jpg"]
  },
  "Toyota Innova Hycross": {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80"]
  },
  "Toyota Urban Cruiser Hyryder": {
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80"]
  },
  "Honda City": {
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80"]
  },
  "Honda Amaze": {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80"]
  },
  "Mahindra XUV 3XO": {
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80"]
  },
  "Mahindra BE 6": {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80"]
  },
  "Skoda Kushaq": {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"]
  },
  "Skoda Slavia": {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80"]
  },
  "Volkswagen Taigun": {
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80"]
  },
  "Volkswagen Virtus": {
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&auto=format&fit=crop&q=80"]
  },
  "Hyundai Alcazar": {
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80"]
  },
  "Hyundai Exter": {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80"]
  },
  "Kia Syros": {
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80"]
  },
  "MG Windsor EV": {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80"]
  },
  "MG Comet EV": {
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800&auto=format&fit=crop&q=80", // Real hatchback style electric car
    gallery: ["https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800&auto=format&fit=crop&q=80"]
  },
  "BMW X1": {
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80"]
  },
  "BMW X3": {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"]
  },
  "BMW 3 Series": {
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80"]
  },
  "Audi Q3": {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80"]
  },
  "Audi Q5": {
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80"]
  }
};

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully for image updates");

    let updatedCount = 0;
    for (const [carName, imgData] of Object.entries(imageMapping)) {
      const result = await Car.updateMany(
        { name: carName },
        { $set: { image: imgData.image, gallery: imgData.gallery } }
      );
      if (result.matchedCount > 0) {
        console.log(`Updated images for: ${carName}`);
        updatedCount++;
      }
    }
    console.log(`Successfully updated image assets for ${updatedCount} vehicles in MongoDB.`);
    process.exit(0);
  } catch (err) {
    console.error("Error updating car images:", err);
    process.exit(1);
  }
};

updateImages();
