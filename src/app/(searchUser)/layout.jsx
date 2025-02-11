import NavigationBar from "@/components/navigation-bar";

function layout({children}) {
  return (
    <div>
        {children}
        <NavigationBar/>
        </div>
  )
}

export default layout;