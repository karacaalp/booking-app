const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ReservationsTable-BzkwdVlC.js","assets/ui-DJOzBBS6.js","assets/utils-B3uJFSQq.js","assets/vendor-BxJgIhGV.js","assets/dateFormats-3GsDklRu.js"])))=>i.map(i=>d[i]);
import{_ as d}from"./index-D5E-7TSL.js";import{j as e}from"./ui-DJOzBBS6.js";import{u as p,a as x,E as h,H as E}from"./useSlotSearch-BvLBpvAg.js";import{r as s,y as a}from"./utils-B3uJFSQq.js";import"./vendor-BxJgIhGV.js";import"./query-GFdO8LR2.js";import"./router-BYhmbNjN.js";const j=s.lazy(()=>d(()=>import("./ReservationsTable-BzkwdVlC.js"),__vite__mapDeps([0,1,2,3,4])));function H(){const{data:o,isFetching:t,isError:n,error:c,refetch:r}=p({isBooked:!0}),{cancelSlot:i,isCancelling:l}=x();s.useEffect(()=>{r()},[r]);const m=async f=>{try{await i({id:f}),a.success("Reservation cancelled successfully"),r()}catch(u){a.error("Error cancelling reservation"),console.error("Error cancelling reservation:",u)}};return n?e.jsx(h,{message:c.message,onRefetch:r}):e.jsxs("div",{className:"p-4",children:[e.jsx(E,{}),e.jsx(s.Suspense,{fallback:e.jsx("div",{className:"flex items-center justify-center p-8",children:"Loading..."}),children:e.jsx(j,{data:o,isFetching:t,onCancel:m,onRefresh:r,isCancelling:l})})]})}export{H as default};
