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

      <div className="flex flex-row ">
        <div className="flex-1 flex flex-col gap-10 justify-center">
          <img className="flex-1" 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=264,fit=crop/AR0exKV0xehn8xZJ/rehab-equipment-Y4LlRnbxeytkoxwb.jpg"
            alt="Rehab"
          />

          

        </div>

        <div className="flex-1 flex flex-col gap-10 justify-center">
          <img 
            className="flex-1"
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=503,h=264,fit=crop/AR0exKV0xehn8xZJ/bf-3-AQE3lZxbnjTn9E68.jpeg" 
            alt="" 
          />
          
      </div>

    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Treatment