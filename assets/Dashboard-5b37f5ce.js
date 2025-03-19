import{j as e}from"./index-d693efaa.js";import{f as i,R as n}from"./react-vendor-f13607dd.js";import{a as r}from"./authService-993db9ec.js";import{R as t,d as s,b as a,e as l,f as d}from"./antd-vendor-11d390a1.js";const{Title:o,Text:c}=d,p=()=>{const d=i(),p=r.getCurrentUser();n.useEffect((()=>{p&&"patient"===p.role||d("/patient/login")}),[p,d]);return e.jsxs("div",{style:{padding:"24px"},children:[e.jsxs(t,{justify:"space-between",align:"middle",style:{marginBottom:"24px"},children:[e.jsxs(s,{children:[e.jsx(o,{level:2,children:"Patient Dashboard"}),e.jsxs(c,{children:["Welcome, ",(null==p?void 0:p.email)||"Patient"]})]}),e.jsx(s,{children:e.jsx(a,{type:"primary",danger:!0,onClick:()=>{r.logout(),d("/patient/login")},children:"Logout"})})]}),e.jsxs(t,{gutter:[16,16],children:[e.jsx(s,{span:8,children:e.jsxs(l,{title:"My Clinical Trials",bordered:!1,children:[e.jsx("p",{children:"You are not enrolled in any clinical trials yet."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/find-trials"),children:"Find Trials"}),e.jsx(a,{style:{marginTop:"8px"},onClick:()=>d("/patient/trial-risk-assessment"),children:"Risk Assessment"})]})}),e.jsx(s,{span:8,children:e.jsxs(l,{title:"My Appointments",bordered:!1,children:[e.jsx("p",{children:"You have no upcoming appointments."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/schedule-appointment"),children:"Schedule Appointment"})]})}),e.jsx(s,{span:8,children:e.jsxs(l,{title:"My Health Data",bordered:!1,children:[e.jsx("p",{children:"Track and manage your health information."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/health-data"),children:"View Health Data"})]})}),e.jsx(s,{span:8,children:e.jsxs(l,{title:"Information Plaza",bordered:!1,children:[e.jsx("p",{children:"Access educational resources about clinical trials."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/information-plaza"),children:"Browse Resources"})]})}),e.jsx(s,{span:8,children:e.jsxs(l,{title:"Trial Consultation",bordered:!1,children:[e.jsx("p",{children:"Chat with trial team members and medical professionals."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/trial-consultation"),children:"Start Chat"})]})}),e.jsx(s,{span:8,children:e.jsxs(l,{title:"Rewards Program",bordered:!1,children:[e.jsx("p",{children:"Earn points and redeem for medical benefits and more."}),e.jsx(a,{type:"primary",onClick:()=>d("/patient/reward-mechanism"),children:"View Rewards"})]})})]})]})};export{p as default};
//# sourceMappingURL=Dashboard-5b37f5ce.js.map
