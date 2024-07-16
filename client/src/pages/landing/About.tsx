import { Footer } from "../../components"

const About = () => {
  return (
    <>
      <div className="flex flex-col leading-loose tracking-wide pb-5">

        <div className="flex justify-center w-full">
          <h1 className="text-[70px]">About us</h1>
        </div>

        <div className="px-5">

          <p className="text-[48px] py-2">Company Profile</p><br />
          The BLUE FOREST PHYSICAL MEDICINE AND REHABILITATION, INC. (BFPMRI) treats neck and low back pains, sports injuries, stroke <br />
          patients, orthopedic, geriatric, pediatric and neurologic cases. <br /><br />

          Blue Forest, which operates home-based as well as clinic operations, also focuses on diabetic patients and cardiovascular maintenance, muscle <br />
          strengthening and toning, thereby promoting a well-balanced individual. Licensed physical therapists and PT assistants are on hand to serve both <br />
          referred and walk-in patients. <br /><br />

          Blue Forest began operating in 2013 at the AMC Bldg. along Libby Road in Puan, Davao City and eventually transferred in April 2016 to its <br />
          current location at Gomez Compound, Yniguez Subd. in Maa. <br /><br />

          On May 1, 2023, or a full decade after it first began, it opens another clinic at Rm. 314 Ecoland Medical and Wellness Center, Inc., along Quimpo <br />
          Blvd., Matina, Davao City. <br /><br />

          Since 2013, it has striven to be true to its motto of: <br /><br /> 

          <span className="font-bold">"Personalized, expert care. Just how Physical Therapy should be."</span>

        </div>
        
        <div className="flex p-10 gap-5">
          <div className="flex-1">
            <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=606,h=344,fit=crop/AR0exKV0xehn8xZJ/tread-mill-maa-branch-A85DR7NqjXIBKNw5.jpg" 
            alt="Treadmill equipment image"
            />
          </div>
          <div className="flex-1">
            <img 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=606,h=344,fit=crop/AR0exKV0xehn8xZJ/rehab-equipment-Y4LlRnbxeytkoxwb.jpg" 
            alt="Rehab equipment image"
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 p-5">
          <div className="leading-loose" >
            <h1
            className="text-[48px] font-bold"
            >Tecar Therapy</h1>
            <p>
              Along with other standard treatment modalities, Blue Forest utilizes Winback Tecar Therapy. More patients, especially those membered with any of the <br />
              health maintenance organizations (HMOs) affiliated with us, can now avail themselves of our updated, state-of-the-art unit. <br /> <br />

              Because of this unique radio frequency approach to deep tissues, "patients experience instant pain relief, muscle relaxation, edema reduction, tissue <br />
              regeneration support and healing."
            </p>
          </div>

          <div className="leading-loose" >
            <h1
            className="text-[48px] font-bold"
            >Hydro Therapy</h1>
            <p>
            Blue Forest prides itself not only as a clinically competent facility, but one that has successfully innovated with aquatic therapy. Over the last four years, it has <br />
            conducted numerous such treatments especially for elderly patients, taking full advantage of swimming pools or the beach's natural healing powers.
            </p>
          </div>

          <div className="leading-loose" >
            <h1
            className="text-[48px] font-bold"
            >HMO-affiliated</h1>
            <p>
            Blue Forest is affiliated with ten  health maintenance organizations (HMO). <br /> <br />
            These are Pacific Cross (formerly Blue Cross) Philippines, which has over 65 years of health and travel insurance experience across Asia; Medicard <br />
            Philippines, Avega, Sunlife Grepa, Intellicare, Maxicare, Cocolife, Valucare, Philcare and 1Coop Health.
            </p>
          </div>
          
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default About