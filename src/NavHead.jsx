import React from 'react'
import PdfExporter from './PdfExporter'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward , faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 



const NavHead = ({ pdfRef,onNextPatient }) => {
  return (
    <div className="navHead" style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px", /* or whatever height you prefer */
            backgroundColor: "hsla(330, 66%, 90%, 1.00)", /* or your preferred background */
            zIndex: 9999, /* ensures it's above other elements */
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}>
            <img src="./public/healthyouLogo.png" alt="" />
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
