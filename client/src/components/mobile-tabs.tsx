"use client"

type Tab = {
  id: string
  label: string
  icon?: string
}

type MobileTabsProps = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const MobileTabs = ({ tabs, activeTab, onTabChange }: MobileTabsProps) => {
  return (
    <div className="flex bg-white border-b border-gray-200 md:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-3 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-center gap-1">
            {tab.icon && <span className="text-xs">{tab.icon}</span>}
            <span>{tab.label}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default MobileTabs
