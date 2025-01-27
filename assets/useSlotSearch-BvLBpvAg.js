import{j as n,d as l}from"./ui-DJOzBBS6.js";import{u as S,c as m}from"./query-GFdO8LR2.js";import{a as u}from"./utils-B3uJFSQq.js";const $=({onRefetch:e,message:t="An error occurred. Please try again."})=>n.jsxs("div",{style:{padding:"20px",backgroundColor:"#ffebee",border:"1px solid #ffcdd2",borderRadius:"4px",marginBottom:"20px"},children:[n.jsx("p",{style:{color:"#c62828",margin:"0 0 10px 0"},children:t}),e&&n.jsx("button",{onClick:e,style:{backgroundColor:"#c62828",color:"white",border:"none",padding:"8px 16px",borderRadius:"4px",cursor:"pointer"},children:"Try Again"})]}),x=l.header`
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: #ffffff;
  box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.1);
`,y=l.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
`,L=()=>n.jsx(x,{children:n.jsx(y,{children:"Booking App"})});var E={};const i=E.VITE_API_URL||"http://localhost:3000",a={SLOTS:`${i}/slots`,SLOT_DETAILS:e=>`${i}/slots/${e}`},b={fetchSlots:"fetchSlots",fetchSlotDetails:"fetchSlotDetails"},h=15e3;class s extends Error{constructor(t,r){super(t),this.statusCode=r,this.name="ApiError"}}const o=u.create({baseURL:i,timeout:h,headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>(console.log(`API Request: ${e.method?.toUpperCase()} ${e.url}`),e),e=>Promise.reject(new s(`Request configuration error: ${e.message}`)));o.interceptors.response.use(e=>{if(!e.data.success)throw new s("Server response unsuccessful",e.status);return e},e=>{if(u.isAxiosError(e)){if(e.code==="ECONNABORTED")throw new s(`Request timeout after ${h}ms`);if(e.response){const t=e.response.status,r=e.response.data?.message||e.message;switch(t){case 400:throw new s(`Invalid request: ${r}`,t);case 401:throw new s("Unauthorized access",t);case 403:throw new s("Permission denied",t);case 404:throw new s("Resource not found",t);case 409:throw new s("Conflict with current state",t);case 500:throw new s("Internal server error",t);default:throw new s(`Operation failed: ${r}`,t)}}if(e.request)throw new s("No response received from server")}throw new s("Unexpected error occurred")});class d extends s{constructor(t,r){super(t,r),this.name="SlotApiError"}}const c=(e,t)=>{throw e instanceof s?new d(e.message,e.statusCode):new d(`Unexpected error during ${t}`)},p={getSlots:async(e={})=>{try{const{data:{data:t}}=await o.get(a.SLOTS,{params:e});return t}catch(t){return c(t,"fetching slot list"),[]}},getSlotById:async(e,t)=>{try{const{data:{data:r}}=await o.get(a.SLOT_DETAILS(e),{signal:t});return r}catch(r){c(r,`fetching slot details with ID: ${e}`);return}},bookSlotById:async(e,t)=>{try{const{data:{data:r}}=await o.post(`${a.SLOT_DETAILS(e)}/book`,{name:t});return r}catch(r){c(r,`booking slot with ID: ${e}`);return}},cancelSlotById:async e=>{try{const{data:{data:t}}=await o.post(`${a.SLOT_DETAILS(e)}/cancel-booking`);return t}catch(t){c(t,`canceling slot with ID: ${e}`);return}}},_=()=>{const e=S({mutationFn:({id:t})=>{if(!t)throw new Error("Missing id");return p.cancelSlotById(t)}});return{cancelSlot:e.mutateAsync,isCancelling:e.isPending}},C=e=>{const{data:t,isFetching:r,isError:f,refetch:w,error:g}=m({queryKey:[b.fetchSlots,e],queryFn:()=>p.getSlots({...e}),enabled:!1});return{data:t,isFetching:r,isError:f,error:g,refetch:w}};export{$ as E,L as H,b as Q,_ as a,p as s,C as u};
