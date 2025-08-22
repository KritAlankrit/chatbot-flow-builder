import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import SendMessageNode from './components/SendMessageNode';

const initialNodes = [
  {
    id: '1',
    type: 'sendMessage',
    position: { x: 100, y: 100 },
    data: { label: 'Hello, this is a test message.' },
  },
];

const initialEdges = [];

const nodeTypes = { sendMessage: SendMessageNode };

function App() {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { label: `New Message Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeChange = (event) => {
    const { value } = event.target;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: value } } : node,
      ),
    );
    setSelectedNode((prev) => ({ ...prev, data: { ...prev.data, label: value } }));
  };
  
  const saveFlow = () => {
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    const unconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));

    if (unconnectedNodes.length > 0) {
      alert('Error: Please connect all nodes before saving the flow.');
    } else {
      alert('Success: Flow saved!');
      console.log('Flow saved:', { nodes, edges });
    }
  };

  const isNodeSelected = selectedNode && Object.keys(selectedNode).length > 0;
  
  // This is the new validation logic for single-edge source
  const isValidConnection = (connection) => {
    const isSourceConnected = edges.some(
      (edge) => edge.source === connection.source
    );
    return !isSourceConnected;
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar (1/4 width) - Combined Nodes and Settings Panel */}
      <aside className="w-1/4 bg-gray-200 p-4 flex flex-col justify-between">
        {isNodeSelected ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedNode(null)}
              >
                &times;
              </button>
            </div>
            <label className="block text-gray-700 mb-2">Message Text</label>
            <textarea
              className="w-full h-32 p-2 border rounded-md"
              value={selectedNode.data.label}
              onChange={onNodeChange}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Nodes Panel</h2>
            <div
              className="bg-white border-2 border-blue-500 rounded-lg p-3 text-center cursor-grab"
              onDragStart={(event) => onDragStart(event, 'sendMessage')}
              draggable
            >
              Send Message
            </div>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={saveFlow}
        >
          Save Flow
        </button>
      </aside>

      {/* Main Flow Canvas (3/4 width) */}
      <main className="w-3/4 bg-gray-50" ref={reactFlowWrapper}>
        <div className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
            isValidConnection={isValidConnection}
          />
        </div>
      </main>
    </div>
  );
}

export default App;