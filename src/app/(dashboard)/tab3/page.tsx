"use client";
import React from "react";
import axios from "axios";

function page() {
  const places = [
    {
      name: "BADAR PUR BORDER BUS STOP",
      latitude: "28.496151",
      longitude: "77.281160",
    },
    {
      name: "BADAR PUR BUS STOP",
      latitude: "28.494881",
      longitude: "77.284618",
    },
    {
      name: "ALI VILLAGE BUS STOP",
      latitude: "28.543522",
      longitude: "77.316897",
    },
    {
      name: "SARITA VIHAR CROSSING BUS STOP",
      latitude: "28.521505",
      longitude: "77.290072",
    },
    {
      name: "KALINDI KUNJ BUS STOP",
      latitude: "28.508572",
      longitude: "77.288348",
    },
    {
      name: "YAMUNA BRIDGE EAST CHECK POST BUS STOP",
      latitude: "28.484378",
      longitude: "77.282830",
    },
    {
      name: "MAHAMAYA FLYOVER WEST BUS STOP",
      latitude: "28.585071",
      longitude: "77.343731",
    },
    {
      name: "AMITY SCHOOL BUS STOP",
      latitude: "28.580948",
      longitude: "77.370732",
    },
    {
      name: "NOIDA SEC-37 BUS STOP",
      latitude: "28.569545",
      longitude: "77.322452",
    },
    {
      name: "NOIDA SEC-43 POLICE CHOKI SADAR PUR BUS STOP",
      latitude: "28.568299",
      longitude: "77.338450",
    },
    {
      name: "AGHA PUR VILLAGE BUS STOP",
      latitude: "28.596527",
      longitude: "77.353692",
    },
    {
      name: "BAROLA VILLAGE BUS STOP",
      latitude: "28.572306",
      longitude: "77.345692",
    },
    {
      name: "HINDON VIHAR MORE BUS STOP",
      latitude: "28.571913",
      longitude: "77.355189",
    },
    {
      name: "SARIN FARM BUS STOP",
      latitude: "28.588759",
      longitude: "77.342814",
    },
    {
      name: "SADAR PUR VILLAGE BUS STOP",
      latitude: "28.568892",
      longitude: "77.341673",
    },
    {
      name: "NOIDA SEC-82 MORE BUS STOP",
      latitude: "28.570304",
      longitude: "77.328954",
    },
    {
      name: "HOUSARY COMPLEX PETROL PUMP BUS STOP",
      latitude: "28.581055",
      longitude: "77.340262",
    },
    {
      name: "NOIDA PH-II BUS STOP",
      latitude: "28.580883",
      longitude: "77.332852",
    },
    {
      name: "NOIDA PH-II PHOOL MANDI BUS STOP",
      latitude: "28.580652",
      longitude: "77.334545",
    },
    {
      name: "NEHRU PLACE TERMINAL BUS STOP",
      latitude: "28.533254",
      longitude: "77.256364",
    },
    {
      name: "PUNJ SONS BUS STOP",
      latitude: "28.534683",
      longitude: "77.257108",
    },
    {
      name: "CROWN PLAZA BUS STOP",
      latitude: "28.535680",
      longitude: "77.258493",
    },
    {
      name: "SARITA VIHAR CROSSING BUS STOP",
      latitude: "28.521505",
      longitude: "77.290072",
    },
    {
      name: "KALINDI KUNJ BUS STOP",
      latitude: "28.508572",
      longitude: "77.288348",
    },
    {
      name: "YAMUNA BRIDGE EAST CHECK POST BUS STOP",
      latitude: "28.484378",
      longitude: "77.282830",
    },
    {
      name: "MAHAMAYA FLYOVER WEST BUS STOP",
      latitude: "28.585071",
      longitude: "77.343731",
    },
    {
      name: "AMITY SCHOOL BUS STOP",
      latitude: "28.580948",
      longitude: "77.370732",
    },
    {
      name: "NOIDA SEC-37 BUS STOP",
      latitude: "28.569545",
      longitude: "77.322452",
    },
    {
      name: "POLICE CHOWKI SADAR PUR BUS STOP",
      latitude: "28.568299",
      longitude: "77.338450",
    },
    {
      name: "AGHA PUR VILLAGE BUS STOP",
      latitude: "28.596527",
      longitude: "77.353692",
    },
    {
      name: "BAROLA VILLAGE BUS STOP",
      latitude: "28.572306",
      longitude: "77.345692",
    },
    {
      name: "HINDON VIHAR MORE BUS STOP",
      latitude: "28.571913",
      longitude: "77.355189",
    },
    {
      name: "SARIN FARM BUS STOP",
      latitude: "28.588759",
      longitude: "77.342814",
    },
    {
      name: "SADAR PUR VILLAGE BUS STOP",
      latitude: "28.568892",
      longitude: "77.341673",
    },
    {
      name: "NOIDA SEC-82 MORE BUS STOP",
      latitude: "28.570304",
      longitude: "77.328954",
    },
    {
      name: "HOUSARY COMPLEX PETROL PUMP BUS STOP",
      latitude: "28.581055",
      longitude: "77.340262",
    },
    {
      name: "NOIDA PH-II BUS STOP",
      latitude: "28.580883",
      longitude: "77.332852",
    },
    {
      name: "NOIDA PH-II PHOOL MANDI BUS STOP",
      latitude: "28.580652",
      longitude: "77.334545",
    },
    {
      name: "OLD DELHI RAILWAY STATION BUS STOP",
      latitude: "28.650765",
      longitude: "77.229785",
    },
    {
      name: "TIS HAZARI ANIMAL HOSPITAL / ISBT K. GATE BUS STOP",
      latitude: "28.655211",
      longitude: "77.226443",
    },
    {
      name: "ICE FACTORY BUS STOP",
      latitude: "28.658919",
      longitude: "77.222539",
    },
    {
      name: "CLOCK TOWER BUS STOP",
      latitude: "28.661421",
      longitude: "77.223430",
    },
    {
      name: "R.P. BAGH BUS STOP",
      latitude: "28.663233",
      longitude: "77.220804",
    },
    {
      name: "BARA BAGH BUS STOP",
      latitude: "28.665094",
      longitude: "77.219012",
    },
    {
      name: "ADARSH NAGAR BUS STOP",
      latitude: "28.672073",
      longitude: "77.214867",
    },
    {
      name: "GTK DEPOT BUS STOP",
      latitude: "28.668063",
      longitude: "77.220484",
    },
    {
      name: "LIBAS PUR GT ROAD BUS STOP",
      latitude: "28.670820",
      longitude: "77.226893",
    },
    {
      name: "NANGLI POONAM BUS STOP",
      latitude: "28.673595",
      longitude: "77.229372",
    },
    {
      name: "BUDH PUR BUS STOP",
      latitude: "28.676411",
      longitude: "77.232297",
    },
    {
      name: "ALIPUR BUS STOP",
      latitude: "28.678932",
      longitude: "77.237094",
    },
    {
      name: "BAKOULI CROSSING BUS STOP",
      latitude: "28.681458",
      longitude: "77.240423",
    },
    {
      name: "BAKHTAWER PUR SCHOOL BUS STOP",
      latitude: "28.683524",
      longitude: "77.242856",
    },
    {
      name: "BAKHTAWER PUR VILLAGE BUS STOP",
      latitude: "28.685810",
      longitude: "77.245153",
    },
    {
      name: "NARELA BUFFALO CHECK POST BUS STOP",
      latitude: "28.689512",
      longitude: "77.247931",
    },
    {
      name: "NARELA JAIL BUS STOP",
      latitude: "28.691887",
      longitude: "77.251146",
    },
    {
      name: "RAJEEV NAGAR BUS STOP",
      latitude: "28.695334",
      longitude: "77.253661",
    },
    {
      name: "MUNDKA BUS STOP",
      latitude: "28.699920",
      longitude: "77.258507",
    },
    {
      name: "MUNDKA CHECK POST BUS STOP",
      latitude: "28.702448",
      longitude: "77.261927",
    },
  ];



  const handleApiRequest = async () => {
    try {
      const response = await axios.post("/api/locations/add", places);
    //   alert("Data Added Successfully");
      console.log(response.data);
    } catch (e) {
      alert("Error");
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold text-center mb-5">Tab 3</h1>
      <button
        onClick={handleApiRequest}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Make API Request
      </button>
    </div>
  );
}

export default page;
