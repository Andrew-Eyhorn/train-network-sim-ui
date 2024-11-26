declare module "react-cytoscapejs" {
    import { Component } from "react";
    import cytoscape, { ElementDefinition, LayoutOptions, Stylesheet } from "cytoscape";
  
    export interface CytoscapeComponentProps {
      elements?: ElementDefinition[] | cytoscape.ElementCollection;
      layout?: LayoutOptions;
      stylesheet?: Stylesheet[] | cytoscape.Stylesheet[];
      style?: React.CSSProperties;
      cy?: (cy: cytoscape.Core) => void; // Callback to access the Cytoscape instance
      className?: string;
      pan?: cytoscape.Position;
      zoom?: number;
      maxZoom?: number;
      minZoom?: number;
      wheelSensitivity?: number;
    }
  
    const CytoscapeComponent: React.FC<CytoscapeComponentProps>;
    export default CytoscapeComponent;
  }
  