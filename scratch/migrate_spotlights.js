const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    envVars[key.trim()] = values.join('=').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  }
});

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];



if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const visits = [
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Christan.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Deviprasad.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ganesh-Hatwar.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Jathin.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhiraj-Jogi.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Kishor.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srinivas-and-shreesha.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shivaprasad.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vineeth-Sampath-and-others.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Nikhil-Shetty.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Priyanka-K-P.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Rakshith-Alva.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shreesha.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shreya-Shetty.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srinath-Patkar.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vaishakh.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Suhas.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Rashmitha.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Niveditha.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Gautham-Shet.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sukitha.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Chidanand.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhanish-Shastri.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ratnashree-and-others.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Akarsh.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dhanraj-Ranjani.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sridhar.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Deepthi-guruprasad.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Preetham-rohan-pavan.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Srihari.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Claton.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ashwath-Shetty.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Adith-Holla.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Sinchana.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Usha-H.webp",
  "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Vidisha-P-Shet.webp"
].map((url, i) => ({
  category: 'visit',
  image_url: url,
  batch_year: null
}));

const eduImages = [
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Puneeth-Acharya.webp", year: "2021" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms._VAISHALI_BANGERA.webp", year: "2020" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-HITHESH-MENDON.webp", year: "2019" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Dr.-Krishnaraj-Chadaga.webp", year: "2018" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Chandana.webp", year: "2017" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms.-LAHARI-VAIDYA.webp", year: "2017" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Shreenidhi-H-Bhat.webp", year: "2016" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/SHANKAR-SHENOY.webp", year: "2016" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/AJESH.webp", year: "2016" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Lavanya.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-Bhargav.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-GANESH-U-G.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Mr.-ROSHAN-S-KOTIAN.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms._Ramyashree.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Musica_Supriya.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Prathwin-raj.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Anusha-B-Rao.webp", year: "2015" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Ms.-HARSHITHA-BHAT.webp", year: "2014" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Shwetha-Kamath.webp", year: "2014" },
  { url: "https://sode-edu.in/smvitm/wp-content/uploads/2026/05/Amrutha-Bhat.webp", year: "2014" }
].map(item => ({
  category: 'educationist',
  image_url: item.url,
  batch_year: item.year
}));

const allRecords = [...visits, ...eduImages];

async function migrate() {
  console.log(`Migrating ${allRecords.length} records to Supabase...`);
  const { data, error } = await supabase.from('spotlights').insert(allRecords);
  if (error) {
    console.error("Migration failed:", error);
  } else {
    console.log("Migration successful!");
  }
}

migrate();
