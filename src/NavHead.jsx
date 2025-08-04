import React from 'react'
import PdfExporter from './PdfExporter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward , faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 
import logo from "./assets/healthyouLogo.png";




const NavHead = ({ pdfRef,onNextPatient }) => {
  return (
    <div className="navHead" style={{position: "fixed"}}>
            <img src={logo} alt="Health You Logo" />
            {/* <h1>Health & Nutrition Dashboard</h1> */}
            <div>
            <PdfExporter targetRef={pdfRef} />
            <button onClick={onNextPatient}>
                
                <FontAwesomeIcon icon={faForward} style={{ marginRight: "6px" }} />
                Next Patient
            </button>
            <button>
                <a style={{
                    textDecoration: "none",
                    color:"white",
                }} 
                href="https://docs.google.com/spreadsheets/d/16h1WhwlKXWpCFSFGVes7Sddsy-XNITbaC0IzSM68KmM/edit?usp=sharing" target="_blank">
                  <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: "6px" }} />
                    Edit Data
                </a>
            </button>
            </div>
            
      
    </div>
  )
}

export default NavHead
