package com.adotematch.ai;

import java.util.*;

public class AStar {
    // Grafo simples: abrigos com coordenadas fictícias (baseado em endereços do BD)
    private final Map<Integer, Node> shelters = new HashMap<>();
    private final Map<Integer, List<Integer>> graph = new HashMap<>();  // Conexões entre abrigos

    public AStar() {
        // Abrigos fictícios
        shelters.put(1, new Node(1, 0, 0));  // Abrigo 1
        shelters.put(2, new Node(2, 10, 10));
        shelters.put(3, new Node(3, 20, 0));
        // Conexões (grafo)
        graph.put(1, Arrays.asList(2));
        graph.put(2, Arrays.asList(1, 3));
        graph.put(3, Arrays.asList(2));
    }

    // Heurística: distância Euclidiana
    private double heuristic(Node a, Node b) {
        return Math.sqrt(Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2));
    }

    public List<Node> findPath(double startX, double startY, int goalId) {
        Node start = new Node(0, startX, startY);  // Posição do adotante
        Node goal = shelters.get(goalId);

        PriorityQueue<Node> open = new PriorityQueue<>();
        Set<Integer> closed = new HashSet<>();

        start.setG(0);
        start.setH(heuristic(start, goal));
        start.setF(start.getG() + start.getH());
        open.add(start);

        while (!open.isEmpty()) {
            Node current = open.poll();
            if (current.getId() == goalId) {
                return reconstructPath(current);
            }
            closed.add(current.getId());

            List<Integer> neighbors = graph.getOrDefault(current.getId(), new ArrayList<>());
            for (int neighId : neighbors) {
                Node neighbor = shelters.get(neighId);
                if (closed.contains(neighId)) continue;

                double tentG = current.getG() + heuristic(current, neighbor);
                if (tentG < neighbor.getG() || !open.contains(neighbor)) {
                    neighbor.setParent(current);
                    neighbor.setG(tentG);
                    neighbor.setH(heuristic(neighbor, goal));
                    neighbor.setF(neighbor.getG() + neighbor.getH());
                    if (!open.contains(neighbor)) open.add(neighbor);
                }
            }
        }
        return Collections.emptyList();  // Sem caminho
    }

    private List<Node> reconstructPath(Node current) {
        List<Node> path = new ArrayList<>();
        while (current != null) {
            path.add(current);
            current = current.getParent();
        }
        Collections.reverse(path);
        return path;
    }
}