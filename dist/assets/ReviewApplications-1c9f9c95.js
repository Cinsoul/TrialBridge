import{j as e}from"./index-d693efaa.js";import{f as t,r as i}from"./react-vendor-f13607dd.js";import{a}from"./authService-993db9ec.js";import{t as s}from"./trialService-28b75ce4.js";import{R as r,b as n,A as l,x as o,X as c,ac as d,ad as p,f as u,n as m,s as x,m as j}from"./antd-vendor-11d390a1.js";const{Title:h}=u,{TextArea:y}=m,g=()=>{const u=t(),m=a.getCurrentUser(),[g,f]=i.useState([]),[v,w]=i.useState([]),[A,S]=i.useState(!0),[k,T]=i.useState(!1),[C,I]=i.useState(null),[b,E]=i.useState(""),[D,F]=i.useState(!1);i.useEffect((()=>{m&&"trialTeam"===m.role||u("/trial-team/login")}),[m,u]),i.useEffect((()=>{(async()=>{try{const e=await s.getAllApplications();e.success?f(e.applications.filter((e=>"pending"===e.status))):x.error("Failed to load applications");const t=await s.getAllTrials();t.success?w(t.trials):x.error("Failed to load trials")}catch(e){x.error("An error occurred while loading data")}finally{S(!1)}})()}),[]);const P=e=>{const t=v.find((t=>t.id===e));return t?t.title:"Unknown Trial"},R=[{title:"Application ID",dataIndex:"id",key:"id"},{title:"Patient Email",dataIndex:"patientEmail",key:"patientEmail"},{title:"Trial",dataIndex:"trialId",key:"trialId",render:e=>P(e)},{title:"Submission Date",dataIndex:"submissionDate",key:"submissionDate"},{title:"Status",dataIndex:"status",key:"status",render:t=>e.jsx(j,{color:"orange",children:t.toUpperCase()})},{title:"Actions",key:"actions",render:(t,i)=>e.jsx(n,{type:"primary",onClick:()=>{return I(e=i),E(e.notes||""),void T(!0);var e},children:"Review"})}];return e.jsxs("div",{style:{padding:"24px"},children:[e.jsxs(r,{align:"middle",style:{marginBottom:"24px"},children:[e.jsx(n,{icon:e.jsx(l,{}),onClick:()=>{u("/trial-team/dashboard")},style:{marginRight:"16px"},children:"Back"}),e.jsx(h,{level:2,style:{margin:0},children:"Pending Applications"})]}),e.jsx(o,{columns:R,dataSource:g,rowKey:"id",loading:A,pagination:{pageSize:10},locale:{emptyText:"No pending applications"}}),e.jsx(c,{title:"Review Application",open:k,footer:null,onCancel:()=>{T(!1),I(null),E("")},children:C&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Patient:"})," ",C.patientEmail]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Trial:"})," ",P(C.trialId)]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Submitted:"})," ",C.submissionDate]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsx("p",{children:e.jsx("strong",{children:"Notes:"})}),e.jsx(y,{rows:4,value:b,onChange:e=>E(e.target.value),placeholder:"Add review notes here..."})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx(n,{danger:!0,icon:e.jsx(d,{}),onClick:async()=>{if(C){F(!1);try{await new Promise((e=>setTimeout(e,1e3))),x.success("Application rejected"),f(g.filter((e=>e.id!==C.id))),T(!1)}catch(e){x.error("Failed to reject application")}}},children:"Reject"}),e.jsx(n,{type:"primary",icon:e.jsx(p,{}),onClick:async()=>{if(C){F(!0);try{await new Promise((e=>setTimeout(e,1e3))),x.success("Application approved successfully!"),f(g.filter((e=>e.id!==C.id))),T(!1)}catch(e){x.error("Failed to approve application")}finally{F(!1)}}},loading:D,children:"Approve"})]})]})})]})};export{g as default};
//# sourceMappingURL=ReviewApplications-1c9f9c95.js.map
