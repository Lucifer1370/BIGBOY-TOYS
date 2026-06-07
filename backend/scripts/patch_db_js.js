const fs = require("fs");
const path = require("path");

const dbJsPath = path.join(__dirname, "database", "db.js");
let content = fs.readFileSync(dbJsPath, "utf8");

const replacements = [
  {
    targetName: 'name: "Maruti Suzuki Fronx"',
    targetImg: 'image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/2023_Suzuki_Fronx_1.5_Front.jpg"',
    newGall: 'gallery: ["https://upload.wikimedia.org/wikipedia/commons/e/e5/2023_Suzuki_Fronx_1.5_Front.jpg"]'
  },
  {
    targetName: 'name: "Maruti Suzuki Brezza"',
    targetImg: 'image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Maruti_Suzuki_Brezza_ZXi%2B_front_view.jpg"',
    newGall: 'gallery: ["https://upload.wikimedia.org/wikipedia/commons/e/e0/2022_Maruti_Suzuki_Brezza_ZXi%2B_front_view.jpg"]'
  },
  {
    targetName: 'name: "Tata Curvv"',
    targetImg: 'image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80"',
    newGall: 'gallery: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=80"]'
  },
  {
    targetName: 'name: "Tata Harrier"',
    targetImg: 'image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/2020_Tata_Nexon_facelift_front_view.jpg"',
    newGall: 'gallery: ["https://upload.wikimedia.org/wikipedia/commons/f/fb/2020_Tata_Nexon_facelift_front_view.jpg"]'
  },
  {
    targetName: 'name: "Toyota Fortuner"',
    targetImg: 'image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Toyota_Fortuner_Legender_2.8_Front.jpg"',
    newGall: 'gallery: ["https://upload.wikimedia.org/wikipedia/commons/4/4b/2021_Toyota_Fortuner_Legender_2.8_Front.jpg"]'
  },
  {
    targetName: 'name: "MG Comet EV"',
    targetImg: 'image: "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?w=800&auto=format&fit=crop&q=80"',
    targetGall: 'gallery: ["https://images.unsplash.com/photo-1606225457115-9b0de873c5db?w=800&auto=format&fit=crop&q=80"]',
    newImg: 'image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800&auto=format&fit=crop&q=80"',
    newGall: 'gallery: ["https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800&auto=format&fit=crop&q=80"]'
  }
];

replacements.forEach((rep) => {
  // Find the block for the car name to apply updates locally to that vehicle entry only
  const nameIndex = content.indexOf(rep.targetName);
  if (nameIndex !== -1) {
    // Find next image and gallery instances relative to this name
    const imgIndex = content.indexOf(rep.targetImg, nameIndex);
    if (imgIndex !== -1 && imgIndex < nameIndex + 300) {
      content = content.substring(0, imgIndex) + rep.newImg + content.substring(imgIndex + rep.targetImg.length);
    }
    const gallIndex = content.indexOf(rep.targetGall, nameIndex);
    if (gallIndex !== -1 && gallIndex < nameIndex + 350) {
      content = content.substring(0, gallIndex) + rep.newGall + content.substring(gallIndex + rep.targetGall.length);
    }
    console.log(`Patched db.js values for: ${rep.targetName}`);
  }
});

fs.writeFileSync(dbJsPath, content, "utf8");
console.log("db.js file patching successfully completed!");
