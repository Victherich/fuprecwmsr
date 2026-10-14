import React, { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext();

const ContextProvider = ({children}) => {
    const [adminToken,setAdminToken]=useState(null)
    const [admin,setAdmin]=useState(null)
    const [adminMenu,setAdminMenu]=useState(0) 
    const [trackingID, setTrackingID] = useState('');
    const api_url = "https://cwmsrfupre.com.ng/base"
    // const api_url = "http://cwmsrfupre.com.ng/base"

      const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);



//     const programs = [
//       { id: 1, name: "Postgraduate Diploma (PGD) in Petroleum Waste Management", code:"PG/CWMSR/PWM" },
//       { id: 2, name: "Postgraduate Diploma (PGD) in Waste Management", code:"PG/CWMSR/WM" },
//       { id: 3, name: "Postgraduate Diploma (PGD) in Environmental Social Work & Community Development" },
//       { id: 4, name: "Postgraduate Diploma (PGD) in Environmental Health Management" },
//       { id: 5, name: "Master Degree in Petroleum Waste Management" },
//       { id: 6, name: "Master Degree in Waste Management" },
//       { id: 7, name: "Master Degree in Environmental Social Work & Community Development" },
//       { id: 8, name: "Master Degree in Environmental Health Management" },
//       { id: 9, name: "Master of Philosophy (M.Phil.) in Petroleum Waste Management" },
//       { id: 10, name: "Master of Philosophy (M.Phil.) in Waste Management" },
//       { id: 11, name: "Master of Philosophy (M.Phil.) in Environmental Social Work & Community Development" },
//       { id: 12, name: "Master of Philosophy (M.Phil.) in Environmental Health Management" },
//       { id: 13, name: "Doctor of Philosophy (Ph.D.) in Petroleum Waste Management" },
//       { id: 14, name: "Doctor of Philosophy (Ph.D.) in Waste Management" },
//       { id: 15, name: "Doctor of Philosophy (Ph.D.) in Environmental Social Work & Community Development" },
//       { id: 16, name: "Doctor of Philosophy (Ph.D.) in Environmental Health Management" },
      
//     { id: 17, name: "Professional PGD in Petroleum Waste Management" },
// { id: 18, name: "Professional PGD in Waste Management" },
// { id: 19, name: "Professional PGD in Environmental Social Work & Community Development" },
// { id: 20, name: "Professional PGD in Environmental Health Management" },

//    { id: 21, name: "Professional Masters in Petroleum Waste Management" },
// { id: 22, name: "Professional Masters in Waste Management" },
// { id: 23, name: "Professional Masters in Environmental Social Work & Community Development" },
// { id: 24, name: "Professional Masters in Environmental Health Management" },

//    { id: 25, name: "Professional Doctorate in Petroleum Waste Management" },
// { id: 26, name: "Professional Doctorate in Waste Management" },
// { id: 27, name: "Professional Doctorate in Environmental Social Work & Community Development" },
// { id: 28, name: "Professional Doctorate in Environmental Health Management" },

//     ];
    
    

const programs = [
      { id: 1, name: "Postgraduate Diploma (PGD) in Petroleum Waste Management", code: "PG/CWMSR/PWM" },
      { id: 2, name: "Postgraduate Diploma (PGD) in Waste Management", code: "PG/CWMSR/WM" },
      { id: 3, name: "Postgraduate Diploma (PGD) in Environmental Social Work & Community Development", code: "PG/CWMSR/ESWCD" },
      { id: 4, name: "Postgraduate Diploma (PGD) in Environmental Health Management", code: "PG/CWMSR/EHM" },
      
      { id: 5, name: "Master Degree in Petroleum Waste Management", code: "MSC/CWMSR/PWM" },
      { id: 6, name: "Master Degree in Waste Management", code: "MSC/CWMSR/WM" },
      { id: 7, name: "Master Degree in Environmental Social Work & Community Development", code: "MSC/CWMSR/ESWCD" },
      { id: 8, name: "Master Degree in Environmental Health Management", code: "MSC/CWMSR/EHM" },
      
      { id: 9, name: "Master of Philosophy (M.Phil.) in Petroleum Waste Management", code: "MPHIL/CWMSR/PWM" },
      { id: 10, name: "Master of Philosophy (M.Phil.) in Waste Management", code: "MPHIL/CWMSR/WM" },
      { id: 11, name: "Master of Philosophy (M.Phil.) in Environmental Social Work & Community Development", code: "MPHIL/CWMSR/ESWCD" },
      { id: 12, name: "Master of Philosophy (M.Phil.) in Environmental Health Management", code: "MPHIL/CWMSR/EHM" },
      
      { id: 13, name: "Doctor of Philosophy (Ph.D.) in Petroleum Waste Management", code: "PHD/CWMSR/PWM" },
      { id: 14, name: "Doctor of Philosophy (Ph.D.) in Waste Management", code: "PHD/CWMSR/WM" },
      { id: 15, name: "Doctor of Philosophy (Ph.D.) in Environmental Social Work & Community Development", code: "PHD/CWMSR/ESWCD" },
      { id: 16, name: "Doctor of Philosophy (Ph.D.) in Environmental Health Management", code: "PHD/CWMSR/EHM" },
      
      { id: 17, name: "Professional PGD in Petroleum Waste Management", code: "PPG/CWMSR/PWM" },
      { id: 18, name: "Professional PGD in Waste Management", code: "PPG/CWMSR/WM" },
      { id: 19, name: "Professional PGD in Environmental Social Work & Community Development", code: "PPG/CWMSR/ESWCD" },
      { id: 20, name: "Professional PGD in Environmental Health Management", code: "PPG/CWMSR/EHM" },

      { id: 21, name: "Professional Masters in Petroleum Waste Management", code: "PMST/CWMSR/PWM" },
      { id: 22, name: "Professional Masters in Waste Management", code: "PMST/CWMSR/WM" },
      { id: 23, name: "Professional Masters in Environmental Social Work & Community Development", code: "PMST/CWMSR/ESWCD" },
      { id: 24, name: "Professional Masters in Environmental Health Management", code: "PMST/CWMSR/EHM" },

      { id: 25, name: "Professional Doctorate in Petroleum Waste Management", code: "PDR/CWMSR/PWM" },
      { id: 26, name: "Professional Doctorate in Waste Management", code: "PDR/CWMSR/WM" },
      { id: 27, name: "Professional Doctorate in Environmental Social Work & Community Development", code: "PDR/CWMSR/ESWCD" },
      { id: 28, name: "Professional Doctorate in Environmental Health Management", code: "PDR/CWMSR/EHM" },
  ];


const levels = [
  { id: 1, name: "Default" },
];

// const semesters = [
//   { id: 1, name: "Semester 1" },
//   { id: 2, name: "Semester 2" },
// ];




const semesters = [
   {id:"", name: "--Select--" },
  { id: 1, name: "First Year in the Program - Semester 1", abb:"Y1-Sem 1" },
  { id: 2, name: "First Year in the Program - Semester 2" , abb:"Y1-Sem 2"},
  { id: 3, name: "Second Year in the Program - Semester 1", abb:"Y2-Sem 1" },
  { id: 4, name: "Second Year in the Program - Semester 2", abb:"Y2-Sem 2" },
  { id: 5, name: "Third Year in the Program - Semester 1", abb:"Y3-Sem 1" },
  { id: 6, name: "Third Year in the Program - Semester 2", abb:"Y3-Sem 2" },
  { id: 7, name: "Fourth Year in the Program - Semester 1", abb:"Y4-Sem 1" },
  { id: 8, name: "Fourth Year in the Program - Semester 2", abb:"Y4-Sem 2" },
  { id: 9, name: "Fifth Year in the Program - Semester 1", abb:"Y5-Sem 1" },
  { id: 10, name: "Fifth Year in the Program - Semester 2", abb:"Y5-Sem 2" },
];


const courses = [

  
  // First Semester
{ id: 1, code: "PWM 751", title: "Introduction to Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/uzj-dtzb-cmx" },
{ id: 2, code: "PWM 752", title: "Drilling Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/jzi-xajj-zeh" },
{ id: 3, code: "PWM 753", title: "Produced Water Treatment and Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/rng-ppjg-jek" },
{ id: 4, code: "PWM 754", title: "Environmental Impact of Oil Spillage", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/uyj-byhc-hcz" },
{ id: 5, code: "PWM 755", title: "Regulations and Compliance in the Oil and Gas Sector", unit: 2, status: "R", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/tpa-mwww-jgc" },
{ id: 6, code: "PWM 756", title: "Principles of Oil Spill Response and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/xiw-kocb-yfu" },
{ id: 7, code: "PWM 758", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/wdi-txbj-zzh" },
{ id: 8, code: "PWM 759", title: "Seminar", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/byc-pekw-dji" },

// Second Semester
{ id: 9, code: "PWM 761", title: "Waste Treatment Technologies in Oil and Gas", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/nkj-abqv-eyt" },
{ id: 10, code: "PWM 762", title: "Hazardous Waste Management in Petroleum Operations", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/kxf-eixo-mfq" },
{ id: 11, code: "PWM 763", title: "Sustainable Practices in Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/gyz-asgy-yrx" },
{ id: 12, code: "PWM 764", title: "Environmental Monitoring and Reporting", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/tch-vfad-hhb" },
{ id: 13, code: "PWM 765", title: "Advanced Hydrocarbon Recovery and Waste Minimization", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/yfv-jcvv-jts" },
{ id: 14, code: "PWM 766", title: "Contaminated Site Assessment and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/cwj-bdso-upt" },
{ id: 15, code: "PWM 768", title: "Climate Change and the Petroleum Industry", unit: 3, status: "E", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/bet-byvh-sym" },
{ id: 16, code: "PWM 799", title: "Project", unit: 6, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/uui-kxgs-gtt" },

// Waste Management Program – First Semester
{ id: 17, code: "WM 711", title: "Principles of Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/afs-ncmr-nka" },
{ id: 18, code: "WM 712", title: "Solid Waste Management and Technology", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/poc-wssg-mwc" },
{ id: 19, code: "WM 713", title: "Hazardous Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/hxn-quxv-yyf" },
{ id: 20, code: "WM 714", title: "Waste Management in the Oil and Gas Industry", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/rpz-yirn-hku" },

  
  
  

  { id: 21, code: "WM 715", title: "Waste Reduction, Reuse, and Recycling", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/tub-osno-mqk" },
{ id: 22, code: "WM 716", title: "Environmental Law and Waste Regulations", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/wou-ayuo-udi" },
{ id: 23, code: "WM 718", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/dqw-mfcs-xgx" },
{ id: 24, code: "WM 719", title: "Seminar", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/ykt-cvmq-cow" },

// Second Semester
{ id: 25, code: "WM 721", title: "Advanced Waste Treatment Technologies", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/oqi-uwfg-ajg" },
{ id: 26, code: "WM 722", title: "Wastewater Treatment and Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/kia-zbwg-vxw" },
{ id: 27, code: "WM 723", title: "Composting and Organic Waste Management", unit: 3, status: "E", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/uuj-opef-rsj" },
{ id: 28, code: "WM 724", title: "Landfill Design and Operation", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/ivn-cywg-fii" },
{ id: 29, code: "WM 725", title: "Pollution Prevention and Control", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/xhi-jwur-qzg" },
{ id: 30, code: "WM 726", title: "Sustainable Waste Management Practices", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/cqv-tpyk-fdf" },

  { id: 31, code: "WM 728", title: "Environmental Monitoring and Reporting", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/xge-ivcr-icy" },
  { id: 32, code: "WM 799", title: "Project", unit: 6, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/shn-kveg-yho" },

  { id: 33, code: "EHM 711", title: "Introduction to Environmental Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/hyz-byeo-fis" },
  { id: 34, code: "EHM 712", title: "Principles of Toxicology and Human Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/tpe-swwf-hbh" },
  { id: 35, code: "EHM 713", title: "Water Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/jpn-fmjo-ped" },
  { id: 36, code: "EHM 714", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/hbo-vwvg-puq" },
  { id: 37, code: "EHM 715", title: "Occupational Health and Safety", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/mjx-qitj-bbx" },
  { id: 38, code: "EHM 716", title: "Environmental Health Risk Assessment", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/ovq-aorx-yjh" },
  { id: 39, code: "EHM 718", title: "Fundamentals of Epidemiology and Biostatistics", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/eti-snco-gos" },
  { id: 40, code: "EHM 719", title: "Seminar", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/wko-iaoz-fto" },

  { id: 41, code: "EHM 721", title: "Environmental Microbiology", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/gbp-yisx-fzi" },
  { id: 42, code: "EHM 722", title: "Food Safety and Hygiene", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/kua-vcpt-txj" },
  { id: 43, code: "EHM 723", title: "Vector Control and Pest Management", unit: 3, status: "E", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/vfa-unae-qpf" },
  { id: 44, code: "EHM 724", title: "Environmental Health Policy and Legislation", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/nzx-fdhg-vxa" },
  { id: 45, code: "EHM 725", title: "Waste Management in Environmental Health", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/bya-ebfv-nyu" },
  { id: 46, code: "EHM 726", title: "Disaster Preparedness and Emergency Response", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/kui-hcqt-ttz" },
  { id: 47, code: "EHM 728", title: "Environmental Monitoring and Surveillance", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/bkq-migf-jfq" },
  { id: 48, code: "EHM 799", title: "Project", unit: 6, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/qat-nyev-zah" },

  { id: 49, code: "ESW 711", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/qnb-uiue-xkh" },
  { id: 50, code: "ESW 712", title: "Community Development Theory and Practice", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/epo-vxmc-efj" },
  { id: 51, code: "ESW 713", title: "Environmental Justice and Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/jfz-nwhh-fhr" },
  { id: 52, code: "ESW 714", title: "Sustainable Development Goals (SDGs) and Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/gsb-fcwn-dqw" },
  { id: 53, code: "ESW 715", title: "Social Research Methods and Data Analysis", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/itr-nosr-sba" },
  { id: 54, code: "ESW 716", title: "Project Planning and Management in Community Settings", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/eef-bpsq-cno" },
  { id: 55, code: "ESW 718", title: "Gender, Environment, and Development", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/ctb-jart-xuw" },
  { id: 56, code: "ESW 719", title: "Seminar in Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/ces-zfvq-xgv" },

  { id: 57, code: "ESW 721", title: "Social Work in Disaster and Emergency Situations", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/ymf-aqwq-hgp" },
  { id: 58, code: "ESW 722", title: "Environmental Policy and Community Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/fey-csco-xuz" },
  { id: 59, code: "ESW 723", title: "Public Health and Community Well-being", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/gyc-gzow-wni" },
  { id: 60, code: "ESW 724", title: "Environmental Education and Awareness", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/gxc-jpfs-pgw" },
  { id: 61, code: "ESW 725", title: "Conflict Resolution and Peacebuilding in Environmental Contexts", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/ojy-wyqy-wxh" },
  { id: 62, code: "ESW 726", title: "Fundraising and Resource Mobilization for Community Projects", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/wbz-zdmj-vsd" },
  { id: 63, code: "ESW 728", title: "Leadership and Governance in Community Development", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/fyp-athg-uun" },
  { id: 64, code: "ESW 799", title: "Field Practicum / Project", unit: 6, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/dtm-verq-csk" },

  { id: 65, code: "PWM 811", title: "Principles of Petroleum Waste Management", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/fex-iqvr-cbd" },
  { id: 66, code: "PWM 812", title: "Oil and Gas Production Waste Characterization", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/zpv-uvzz-geb" },
  { id: 67, code: "PWM 813", title: "Treatment and Disposal of Drilling Mud and Cuttings", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/mnp-asoz-mbe" },
  { id: 68, code: "PWM 814", title: "Environmental Impact Assessment in Oil and Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/ujs-jyve-tss" },
  { id: 69, code: "PWM 815", title: "Risk Assessment and Management in Petroleum Sector", unit: 2, status: "R", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/hji-ifnk-dbk" },
  { id: 70, code: "PWM 816", title: "Petroleum Hydrocarbon Spill Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/pkh-hnyc-zwq" },
  { id: 71, code: "PWM 819", title: "Seminar in Petroleum Waste Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/bbh-hohd-ffn" },

  { id: 72, code: "PWM 821", title: "Remediation of Petroleum-Contaminated Sites", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/sqc-qktp-cxs" },
  { id: 73, code: "PWM 822", title: "Advanced Wastewater Treatment in Oil and Gas Operations", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/gmb-dfvj-cwh" },
  { id: 74, code: "PWM 823", title: "Waste Minimization and Resource Recovery Techniques", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/dcx-jffc-qik" },
  { id: 75, code: "PWM 824", title: "Environmental Regulations and Compliance in Oil & Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/avx-erhg-qzn" },
  { id: 76, code: "PWM 825", title: "Offshore Waste Management Practices", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/zod-cxyo-cra" },
  { id: 77, code: "PWM 826", title: "Sustainable Practices in Petroleum Industry", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/kqb-kfin-cqh" },
  { id: 78, code: "PWM 828", title: "Leadership and Management in Petroleum Waste", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/uxh-hzxf-cbx" },
  { id: 79, code: "PWM 899", title: "Project", unit: 6, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/huw-nhaj-yuu" },    
      
     
  { id: 80, code: "WM 811", title: "Advanced Principles of Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/hbh-yvmt-cti" },
  { id: 81, code: "WM 812", title: "Waste Characterization and Quantification", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/zbf-vcgn-aum" },
  { id: 82, code: "WM 813", title: "Waste Collection and Transport Systems", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/vpv-hqdp-wyj" },
  { id: 83, code: "WM 814", title: "Waste Treatment Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/osu-sjzq-qda" },
  { id: 84, code: "WM 815", title: "Environmental Impact Assessment", unit: 4, status: "R", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/wyc-qpcf-vgf" },
  { id: 85, code: "WM 816", title: "Policy and Regulations in Waste Management", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/rsx-yjkb-dyv" },
  { id: 86, code: "WM 819", title: "Seminar", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/zzc-saxk-ssv" },

  { id: 87, code: "WM 821", title: "Hazardous Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/kwd-dxot-rtq" },
  { id: 88, code: "WM 822", title: "Recycling and Resource Recovery Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/isu-dyuy-nuu" },
  { id: 89, code: "WM 823", title: "Waste-to-Energy Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/fwh-vpew-aci" },
  { id: 90, code: "WM 824", title: "Sustainable Waste Management Practices", unit: 3, status: "R", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/xzp-gary-hfu" },
  { id: 91, code: "WM 825", title: "Environmental Health and Waste Management", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/wni-ikhn-szj" },
  { id: 92, code: "WM 826", title: "Advanced Wastewater Treatment", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/npd-yqyy-kuw" },
  { id: 93, code: "WM 828", title: "Leadership and Management in Waste Projects", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/wtr-wviv-rji" },
  { id: 94, code: "WM 899", title: "Project", unit: 6, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/ciw-vucs-bep" },

  { id: 95, code: "ESW 811", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/awj-fkpc-qwq" },
  { id: 96, code: "ESW 812", title: "Community Engagement and Participatory Development", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/rhh-otox-dbs" },
  { id: 97, code: "ESW 813", title: "Environmental Justice and Human Rights", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/cvq-ezkm-nmx" },
  { id: 98, code: "ESW 814", title: "Social Work Ethics and Professional Practice", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/det-krxe-xvs" },
  { id: 99, code: "ESW 815", title: "Methods and Tools for Community-Based Research", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/aik-qsfv-sad" },
  { id: 100, code: "ESW 816", title: "Disaster Risk Reduction and Management", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/taa-zhci-pfh" },
  { id: 128, code: "ESW 819", title: "Seminar", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/hcx-ooum-nbc" },

  { id: 101, code: "ESW 721", title: "Social Policy and Advocacy in Environmental Contexts", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mcp-xkmm-ctk" },
  { id: 102, code: "ESW 722", title: "Sustainable Community Development Practices", unit: 3, status: "R", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/jft-sbsn-mjj" },

 
      
    

 { id: 103, code: "ESW 723", title: "Health and Environmental Interventions in Communities", unit: 3, status: "E", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/cym-vzyo-bbd" },
{ id: 104, code: "ESW 724", title: "Program Planning and Evaluation for Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/qon-xjwu-fcg" },
{ id: 105, code: "ESW 725", title: "Advanced Research Methods in Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/kvc-ifyq-wfy" },
{ id: 106, code: "ESW 726", title: "Practicum: Community-Based Environmental Project", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mkg-azne-ebt" },
{ id: 107, code: "ESW 799", title: "Capstone Project in Environmental Social Work", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mmi-ewju-xet" },

{ id: 108, code: "EHM 811", title: "Principles of Environmental Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/sfq-oydi-eki" },
{ id: 109, code: "EHM 812", title: "Epidemiology and Public Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/stx-nmcj-uap" },
{ id: 110, code: "EHM 813", title: "Environmental Toxicology and Risk Assessment", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/jss-ytof-exc" },
{ id: 111, code: "EHM 814", title: "Environmental Policy and Regulation", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/exz-pgjt-mru" },
{ id: 112, code: "EHM 815", title: "Health Impact Assessment", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/zyw-afwp-zuq" },
{ id: 113, code: "EHM 816", title: "Environmental Health Laboratory Techniques", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/bcu-thfu-vng" },
{ id: 114, code: "EHM 819", title: "Seminar in Environmental Health Issues", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/eia-ngfe-qpv" },

{ id: 115, code: "EHM 821", title: "Occupational Health and Safety", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/zfc-aqga-brj" },
{ id: 116, code: "EHM 822", title: "Water, Sanitation, and Hygiene (WASH) Management", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ecc-rypz-kaz" },
{ id: 117, code: "EHM 823", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/dyt-qpxi-ont" },
{ id: 118, code: "EHM 824", title: "Waste Management and Pollution Control", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ovz-firv-isd" },
{ id: 119, code: "EHM 825", title: "Advanced Geographic Information Systems (GIS) in Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/fna-ftsi-vyt" },
{ id: 120, code: "EHM 826", title: "Climate Change and Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/knb-btnm-qcp" },
{ id: 121, code: "EHM 899", title: "Research Project", unit: 6, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ruq-chqe-ogw" },

{ id: 122, code: "WM 818", title: "Environmental Politics, Governance, and Social Innovation",unit:2, link: "https://meet.google.com/swb-hfme-snd" },
{ id: 123, code: "PWM 818", title: "Environmental Politics, Governance, and Social Innovation",unit:2, link: "https://meet.google.com/uur-zwca-hsi" },
{ id: 124, code: "ESW 818", title: "Environmental Politics, Governance, and Social Innovation",unit:2, link: "https://meet.google.com/sky-xxcs-xqq" },
{ id: 125, code: "EHM 818", title: "Environmental Politics, Governance, and Social Innovation",unit:2, link: "https://meet.google.com/huy-oetf-zwh" },
{ id: 126, code: "WM 833", title: "Artificial Intelligence in Waste Management",unit:3, link: "https://meet.google.com/vns-qqqb-sba" },
{ id: 127, code: "PWM 833", title: "Artificial intelligent in petroleum waste management",unit:3, link: "https://meet.google.com/hdu-yufu-vps" },

///new addition starts here 6/18/2026

 { id: 129, code: "PWM 821", title: "Decommissioning, Site Closure & Liability Management",unit:2, link: "https://meet.google.com/cmg-zfma-syr" },
  { id: 130, code: "ESW 821", title: "Climate Migration, Conflict & Community Resilience",unit:2, link: "https://meet.google.com/dyt-mvtw-kqr" },
  { id: 131, code: "EHM 821", title: "Global Environmental Burden of Disease",unit:1, link: "https://meet.google.com/xgp-jfkc-wee" },
  { id: 132, code: "WM 822", title: "Global Recycling Markets & Resource Recovery Finance",unit:2, link: "https://meet.google.com/bxf-ydaj-dpd" },
  { id: 133, code: "PWM 822", title: "Produced Water Treatment & Beneficial Reuse",unit:2, link: "https://meet.google.com/eng-kbpe-mgy" },
  { id: 134, code: "ESW 822", title: "Social Licence to Operate & Stakeholder Negotiation",unit:1, link: "https://meet.google.com/zzt-rggh-hwh" },
  { id: 135, code: "EHM 822", title: "One Health & Planetary Health Systems",unit:2, link: "https://meet.google.com/tft-opvz-fcm" },
  { id: 136, code: "WM 823", title: "Smart Waste Systems, Digitalisation & AI",unit:4, link: "https://meet.google.com/psz-biir-ajh" },
  { id: 137, code: "PWM 823", title: "International Standards, ESG & Energy Transition",unit:1, link: "https://meet.google.com/one-nugg-pvv" },
  { id: 138, code: "ESW 823", title: "Livelihood Restoration & Just Transition",unit:1, link: "https://meet.google.com/ynr-jwoj-gug" },
  { id: 139, code: "EHM 823", title: "Emergency Preparedness & Environmental Disasters", link: "https://meet.google.com/ypd-zmse-sfk" },
  { id: 140, code: "WM 824", title: "Climate Change Mitigation & Zero Waste Strategies", link: "https://meet.google.com/zuu-dhxm-zix" },
  { id: 141, code: "PWM 824", title: "Advanced Remediation Technologies",unit:2, link: "https://meet.google.com/xhz-bgqd-ksy" },
  { id: 142, code: "ESW 824", title: "Gender, Vulnerability & Environmental Governance",unit:2, link: "https://meet.google.com/ymo-zuso-xvf" },
  { id: 143, code: "EHM 824", title: "Exposure Science & Biomonitoring",unit:2, link: "https://meet.google.com/dkp-qpnj-fts" },
  { id: 144, code: "WM 825", title: "Professional Practice, Leadership & Consultancy",unit:2, link: "https://meet.google.com/roj-aivu-yge" },
  { id: 145, code: "PWM 825", title: "Petroleum Environmental Data Analytics",unit:1, link: "https://meet.google.com/shj-qxgu-vrn" },
  { id: 146, code: "ESW 825", title: "Monitoring & Evaluation for Development Projects",unit:2, link: "https://meet.google.com/kaw-owvd-tem" },
  { id: 147, code: "EHM 825", title: "Health Systems Management & International Regulation",unit:2, link: "https://meet.google.com/rws-ghup-myu" },
  { id: 148, code: "TUTORIAL", title: "Tutorials / Group Discussions / Academic Support", link: "https://meet.google.com/qyy-uwgh-yqs" },
  { id: 149, code: "CWMSR LAB", title: "CWMSR Innovation Lab / Industry Residency Supervision",unit:3, link: "https://meet.google.com/ghn-yzdf-hgj" },
  { id: 150, code: "SEMINAR", title: "Research Seminars / Visiting Industry Experts / Professional Masterclasses", link: "https://meet.google.com/ahb-bbhh-odh" },

  { id: 151, code: "WM 821", title: "Circular Economy Systems & Industrial Symbiosis",unit:3, link: "https://meet.google.com/zvp-bhuo-qbv" },
  { id: 152, code: "CWMSR 842", title: "Leadership and Management",unit:2, link: "https://meet.google.com/uea-ipba-vtp" },
  { id: 153, code: "PWM 841", title: "Petroleum Industry Operations and Environmental Systems",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" },
 

  // next new courses 9/16/2026
  { id: 154, code: "CWMSR 711", title: "Foundations of Environmental Science and Sustainability",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 155, code: "CWMSR 712", title: "Basic Science, Chemistry and Biology for Environmental Professionals",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027" },
  { id: 156, code: "CWMSR 713", title: "Communication, Academic Writing and Digital Literacy",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 157, code: "CWMSR 714", title: "Fundamentals of Research Methods, Statistics and Data Interpretation",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 158, code: "CWMSR 715", title: "Environmental Policy, Law, Ethics and Governance",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 159, code: "CWMSR 716", title: "Project Planning, Entrepreneurship and Basic Cost Estimation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 160, code: "CWMSR 729", title: "Supervised Professional Project and Field Practicum",unit:6, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 161, code: "WMT 721", title: "Introduction to Integrated Solid Waste Management",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 162, code: "WMT 722", title: "Waste Characterisation, Quantification and Data Management",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 163, code: "WMT 723", title: "Fundamentals of Waste Treatment and Resource Recovery",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 164, code: "WMT 724", title: "Landfill, Waste-Facility Operations and Environmental Control",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 165, code: "PWM 721", title: "Introduction to Petroleum Industry Operations",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 166, code: "PWM 722", title: "Petroleum Waste Characterisation and Management",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 167, code: "PWM 723", title: "Oil-Spill Prevention, Response and Remediation",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 168, code: "PWM 724", title: "Petroleum Environmental Compliance, Safety and Sustainability",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 169, code: "ESW 721", title: "Foundations of Environmental Social Work",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 170, code: "ESW 722", title: "Community Engagement and Participatory Development",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 171, code: "ESW 723", title: "Environmental Justice, Conflict and Social Safeguards",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 172, code: "ESW 724", title: "Disaster Response, Psychosocial Support and Community Resilience",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 173, code: "EHM 721", title: "Foundations of Environmental and Public Health",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 174, code: "EHM 722", title: "Water, Sanitation, Hygiene and Waste-Related Diseases",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 175, code: "EHM 723", title: "Environmental Pollution, Toxicology and Health-Risk Assessment",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 176, code: "EHM 724", title: "Disease Surveillance, Occupational Health and Emergency Response",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},





// ALREADY CHECKED
  { id: 177, code: "WMT 811", title: "Integrated Solid Waste Management Systems",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 178, code: "WMT 812", title: "Waste Characterisation and Process Design",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 179, code: "WMT 813", title: "Waste Collection and Transport Systems",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 180, code: "WMT 814", title: "Waste Treatment Technologies",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 181, code: "WMT 815", title: "Environmental Impact Assessment",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 182, code: "WMT 816", title: "Policy and Regulations in Waste Management",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 183, code: "WMT 819", title: "Seminar Series",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 184, code: "WMT 834", title: "Environmental Data Analytics, GIS and Facility Modelling",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 185, code: "WMT 835", title: "Research Methods and Engineering Innovation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},

// NEED CHECKING
//     { id: 192, code: "ESW 817", title: "Environmental Conflict, Peacebuilding and Livelihood Restoration", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
//   { id: 194, code: "ESW 833", title: "Social Impact Assessment, Resettlement and Livelihood Restoration", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 201, code: "PWM 817", title: "Engineering Project Management, Cost Estimation and BOQ Preparation",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 202, code: "PWM 819", title: "Seminar Series",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 203, code: "PWM 833", title: "Artificial Intelligence in the Petroleum Sector",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
 { id: 210, code: "EHM 817", title: "Environmental Disease Surveillance and One Health",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 211, code: "EHM 819", title: "Seminar Series",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 212, code: "EHM 833", title: "Occupational and Industrial Hygiene Management",unit:3, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027"},
  { id: 213, code: "CWMSR 818", title: "Environmental Politics, Governance and Social Innovation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 214, code: "WMT 821", title: "Circular Economy Systems and Industrial Symbiosis",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 215, code: "WMT 822", title: "Global Recycling Markets and Resource Recovery Finance",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 216, code: "WMT 823", title: "Smart Waste Systems, Digitalisation and Artificial Intelligence",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 217, code: "WMT 824", title: "Climate Change Mitigation and Zero-Waste Strategies",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 218, code: "WMT 826", title: "Engineered Landfill Design, Operation and Closure",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 219, code: "WMT 827", title: "Material Recovery, Composting and Biological Treatment Systems",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 220, code: "WMT 841", title: "Waste Infrastructure Planning, Project Management and BOQ Preparation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 221, code: "PWM 821", title: "Petroleum Facility Decommissioning, Site Closure, Liability Management and Remediation of Contaminated Sites",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
   { id: 228, code: "PWM 842", title: "Offshore waste management practices",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027" },
  { id: 234, code: "ESW 826", title: "Psychosocial Support in Environmental Emergencies",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 235, code: "ESW 827", title: "Indigenous Knowledge and Community-Based Resource Management",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
   { id: 237, code: "EHM 822", title: "Water, Sanitation, Hygiene and Public Health",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 238, code: "EHM 823", title: "Air Quality Management and Respiratory Health",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 239, code: "EHM 824", title: "Food Safety, Toxicology and Consumer Health Protection",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 240, code: "EHM 825", title: "Occupational and Industrial Health Management",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 241, code: "EHM 826", title: "Climate Change and Emerging Environmental Health Risks",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session:"2026/2027"},
  { id: 242, code: "EHM 827", title: "Environmental Disease Surveillance and Outbreak Investigation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  { id: 243, code: "CWMSR 825", title: "Professional Practice, Leadership and Consultancy",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session:"2026/2027"},
  
{ id: 245, code: "ESW 811", title: "Introduction to Environmental Social Work", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 246, code: "ESW 812", title: "Community Engagement and Participatory Development", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 247, code: "ESW 813", title: "Environmental Justice and Human Rights", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 248, code: "ESW 814", title: "Social Work Ethics and Professional Practice", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 249, code: "ESW 815", title: "Methods and Tools for Community-Based Research", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 250, code: "ESW 816", title: "Disaster Risk Reduction and Management", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 251, code: "ESW 817", title: "Environmental Conflict, Peacebuilding and Livelihood Restoration", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 252, code: "ESW 819", title: "Seminar Series", units: 1, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
{ id: 253, code: "ESW 833", title: "Social Impact Assessment, Resettlement and Livelihood Restoration", units: 2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },  
  
  
  //DUPLICATES
  { id: 244, code: "CWMSR 842", title: "Leadership and Management",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
 { id: 204, code: "EHM 811", title: "Principles of Environmental Health",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 205, code: "EHM 812", title: "Epidemiology and Public Health",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 206, code: "EHM 813", title: "Environmental Toxicology and Risk Assessment",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 207, code: "EHM 814", title: "Environmental Policy and Regulation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 208, code: "EHM 815", title: "Health Impact Assessment",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 209, code: "EHM 816", title: "Environmental Health Laboratory Techniques",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 236, code: "EHM 821", title: "Global Environmental Burden of Disease",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//  { id: 186, code: "ESW 811", title: "Introduction to Environmental Social Work", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 187, code: "ESW 812", title: "Community Engagement and Participatory Development", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 188, code: "ESW 813", title: "Environmental Justice and Human Rights", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 189, code: "ESW 814", title: "Social Work Ethics and Professional Practice", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 190, code: "ESW 815", title: "Methods and Tools for Community-Based Research", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 191, code: "ESW 816", title: "Disaster Risk Reduction and Management", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
//   { id: 193, code: "ESW 819", title: "Seminar Series", link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 229, code: "ESW 821", title: "Climate Migration, Conflict and Community Resilience",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 230, code: "ESW 822", title: "Social Licence to Operate and Stakeholder Negotiation",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 231, code: "ESW 823", title: "Livelihood Restoration and Just Transition",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 232, code: "ESW 824", title: "Gender, Vulnerability and Environmental Governance",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 233, code: "ESW 825", title: "Monitoring and Evaluation for Development Projects",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 195, code: "PWM 811", title: "Principles of Petroleum Waste Management",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 196, code: "PWM 812", title: "Oil and Gas Production Waste Characterisation",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf",  admission_session: "2026/2027" },
  { id: 197, code: "PWM 813", title: "Treatment and Disposal of Drilling Mud and Cuttings",units:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 198, code: "PWM 814", title: "Environmental Impact Assessment in Oil and Gas",units:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 199, code: "PWM 815", title: "Risk Assessment and Management in the Petroleum Sector",units:2, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
  { id: 200, code: "PWM 816", title: "Petroleum Hydrocarbon Spill Management",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 222, code: "PWM 822", title: "Produced Water Treatment and Beneficial Reuse",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 223, code: "PWM 823", title: "International Standards, ESG and Energy Transition",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027" },
  { id: 224, code: "PWM 824", title: "Advanced Remediation Technologies",unit:2, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 225, code: "PWM 825", title: "Petroleum Environmental Data Analytics",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  { id: 226, code: "PWM 826", title: "Sustainable Practices in the Petroleum Industry",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf" , admission_session: "2026/2027"},
 { id: 227, code: "PWM 841", title: "Petroleum Industry Operations and Environmental Systems",unit:1, link: "https://meet.google.com/bwa-nvrb-pmf", admission_session: "2026/2027" },
  

];


console.log(courses.length)

const sortedCourses = [...courses].sort((a, b) =>
  a.code.localeCompare(b.code, undefined, { numeric: true })
);


// const sortedCourses2 = [...courses2].sort((a, b) =>
//   a.code.localeCompare(b.code, undefined, { numeric: true })
// );


//NEVER CHANGE THE SEQUENCE OR IT WILL CHANGE ALOT
const categories = [
  {id:1, name:"Assignment"},
  {id:2, name:"Quiz / Assessment-Test"},
  {id:3, name:"Exam"}
]


const possible_levels_for_studnet_login = [
  {id:1, code:"current", name:"Current Semester"},
  {id:2, code:"L1S1", name:"Last First Semester of Level"},
]


  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');

 const handleMenuClick = (menu) => {
    window.scroll(0,0);
    setActiveMenu(menu);
    setMenuOpen(false); // Close menu on mobile when a menu item is clicked
  };

const [dhb, setDhb]=useState(true)

  return (
    <Context.Provider value={{adminToken,setAdminToken,admin,setAdmin,adminMenu,
    setAdminMenu,trackingID,setTrackingID,
    programs, levels, semesters, courses:sortedCourses, categories,
    menuOpen, setMenuOpen, activeMenu,setActiveMenu,handleMenuClick,dhb, setDhb, 
    possible_levels_for_studnet_login, api_url, isUploadModalOpen, setIsUploadModalOpen
    }}>

        {children}
    </Context.Provider>
      

  )
}

export default ContextProvider






// auth o client id
// 547827396763-p5m55vd5rpu8vpqf77fiisj4u530de4j.apps.googleusercontent.com



// zoom production
// client id:  j1matrTkRzOoOYlVjXpfIA
// client secret: xidN4zuK5shmd8FQtNeyxNvsLt2wnQ55


// secrete token: JCT6ppt3TvCK_1ip7cPvTw
// erification token : LSSsgK8tRsuI0kHzgZruKg





