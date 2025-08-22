function App() {
  return (
    <div className="flex w-screen h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Nodes Panel</h2>
      </aside>

      {/* Main Flow Canvas */}
      <main className="flex-1 bg-gray-50">
        <div className="w-full h-full">
          {/* React Flow will be rendered here */}
        </div>
      </main>

      {/* Right Settings Panel */}
      <aside className="w-80 bg-gray-300 p-4">
        <h2 className="text-xl font-semibold mb-4">Settings Panel</h2>
      </aside>
    </div>
  );
}

export default App;