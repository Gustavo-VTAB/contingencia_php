// import Sidebar from '../components/Sidebar';
// import type { TabType } from '../types';

// interface DefaultLayoutProps {
//   activeTab?: TabType;
//   onTabChange?: (tab: TabType) => void;
//   counts?: {
//     profiles: number;
//     managers: number;
//     cards: number;
//     phones: number;
//     accounts: number;
//     proxies: number;
//   };
// }

// export default function DefaultLayout({ 
//   activeTab = 'profiles', 
//   onTabChange = () => {}, 
//   counts = {
//     profiles: 0,
//     managers: 0,
//     cards: 0,
//     phones: 0,
//     accounts: 0,
//     proxies: 0
//   }
// }: DefaultLayoutProps) {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar
//         activeTab={activeTab}
//         onTabChange={onTabChange}
//         counts={counts}
//       />
      
//       <div className="flex-1 overflow-auto">
//         {children}
//       </div>
//     </div>
//   );
// }