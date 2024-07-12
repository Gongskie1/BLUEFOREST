import { Footer } from "../components"

const Treatment = () => {
  return (
    <>
    <div className="flex flex-col leading-loose tracking-tight">
      <h1 className="text-[80px] px-5 py-5">Treatment Mode</h1>

      <div>
        <p className="p-[80px_40px_40px_40px]">
          Blue Forest adapts various treatment modalities to achieve the well-being of patients. These include acupuncture, aquatic therapy, aerobic methods, cardiopulmonary, <br />
          needling, edema control, electrotherapy, heat and cold treatment. As called for programs prepared for individual cases,  a combination of the treatment modalities maybe <br />
          applied. Each case is properly analyzed and prepared appropriate treatment programs. A description of two of the most utilized efficacent approach are presented here.
        </p>
      </div>

      <div className="flex flex-col">

        <div className="flex flex-row w-full">
          <div className="flex-1 flex justify-center">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=264,fit=crop/AR0exKV0xehn8xZJ/rehab-equipment-Y4LlRnbxeytkoxwb.jpg"
              alt="Rehab"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <img 
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=264,fit=crop/AR0exKV0xehn8xZJ/bf-3-AQE3lZxbnjTn9E68.jpeg" 
              alt="" 
            />
          </div>
        </div>

        <div className="flex flex-row p-[10px_70px_20px_70px] gap-32">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold ">Tecar Therapy</h2><br /><br />
            <p>
            Along with other standard treatment modalities, Blue Forest  <br />
            utilizes Winback Tecar Therapy. More patients, especially those <br />
            membered with any of the health maintenance organizations <br />
            (HMOs) affiliated with us, can now avail themselves of our <br />
            updated, state-of-the-art unit. <br /><br />
            Because of this unique radio frequency approach to deep <br />
            tissues, "patients experience instant pain relief, muscle <br />
            relaxation, edema reduction, tissue regeneration support and <br />
            healing."
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Aquatic Therapy</h2><br /><br />
            <p>
            Blue Forest prides itself not only as a clinically competent facility, <br />
            but one that has successfully innovated with aquatic therapy. <br />
            Over the last four years, it has conducted numerous such <br />
            treatments especially for elderly patients, taking full advantage <br />
            of swimming pools or the beach's natural healing powers.
            </p>
          </div>
        </div>

      </div>

    </div>

    <Footer/>
    </>
  )
}

export default Treatment