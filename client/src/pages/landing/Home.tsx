import { Link } from "react-router-dom";
import { Footer } from "../../components";

const Home = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex-1 flex justify-center">
            <h1 className="text-5xl p-20">
              Blue Forest <br /> Physical Medicine <br /> and Wellness <br /> Center
            </h1>
          </div>
          
          <div className="flex-1 overflow-hidden  justify-center">
            
            <div className="">
              <img
                className="max-w-[606px] max-h-[496px] w-full h-full p-20"
                // style={{ maxWidth: '100%', height: 'auto' }}
                src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=606,h=496,fit=crop/AR0exKV0xehn8xZJ/blu-tarp-final-A3QBREGPLvIDrWla.jpg"
                alt="congratulations!" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center py-10">
          <p className="text-[18px]">
            Blue Forest is a physical therapy clinic based in Davao City, Philippines. With a dedicated and professional staff, it treats a variety of <br />
            conditions such as neck and low back pains, disabilities related to strokes and sports injuries, discomforts arrising from bad posture at <br />
            work and many others.
            <br />
            <br />
            At 10:00 a.m. on May 1, 2023, a new clinic opens at the 3rd floor, ECOMED (Ecoland Medical and Wellness Center) at Quimpo Blvd. <br />
            brcorner Tulip Drive, Matina, Davao City.
            <br />
            <br />
            The new location offers a better opportunity for the clinic to reach out to, and serve more patients. Our ECOMED clinic is our new <br />
            home..... and we hope it will be yours, too, for your PT-related needs.
            <br />
            <br />
            Since 2013, when it started, it has striven to be true to its motto:
            <br />
            <br />
            "Personalized, expert care. Just how Physical Therapy should be."
            <br />
            <br />
            For more detailed descriptions of our clinic and staff capabilities, please see the <Link to={"about"}>About page</Link>.
          </p>
        </div>
      </div>
      
      <div className="flex flex-row">

        
          
        
        <div className="flex-1 flex flex-row gap-5 justify-center">
          <img
          className="rounded-xl" 
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=415,h=476,fit=crop/AR0exKV0xehn8xZJ/ecomed-doctors-mP4ZV3Pej0tB1qyq.jpg" 
          alt="doctors office image" 
          />
          <img
          className="rounded-xl" 
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=621,h=471,fit=crop/AR0exKV0xehn8xZJ/ecomed-branch-AE0EJ7M5nJtpJ5gx.jpg" 
          alt="door way image" />
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Home;
