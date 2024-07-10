import { FooterElementBranch1, FooterElementBranch2 } from "../Constants/NavElment";
import { FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";

const SocialMediaIcons = [<FaTwitter/>,<FaFacebook/>,<FaInstagram/>];

const Footer = () => {
  return (
    <footer className="flex flex-row w-full pt-4">
        <div className="w-full flex px-5 p-5 border-t-[1px] list-none">
            <div className="flex-1 flex flex-col justify-between gap-5">
                {
                    FooterElementBranch1.map((element,index)=>(
                        <div key={index}>
                            <h2
                            className="font-semibold pb-2 text-black"
                            >{element.header}</h2>
                            <p>{element.context.map((item, itemIndex) =>(
                                <li key={itemIndex}>
                                    {item}
                                </li>
                            ))}</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex-1 flex flex-col justify-between gap-5">
            {
                    FooterElementBranch2.map((element,index)=>(
                        <div key={index}>
                            <h2
                            className="font-semibold pb-2 text-black"
                            >{element.header}</h2>
                            <p>{element.context.map((item, itemIndex) =>(
                                <li key={itemIndex}>
                                    {item}
                                </li>
                            ))}</p>
                        </div>
                    ))
                }
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex text-2xl flex-grow">
                    <div className="flex flex-row gap-5 self-start text-black">
                    {
                        SocialMediaIcons.map((icons,iconsIndex)=>(
                            <li key={iconsIndex} className="hover:text-blue-600 cursor-pointer ease-in-out duration-200">{icons}</li>
                        ))
                    }
                    </div>
                </div>
                <div>
                    <p>email: info@blueforestwellnesscenter.com</p>
                    <p>Smart: 0916xxxxxxxx  Globe: 0917xxxxxx</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer