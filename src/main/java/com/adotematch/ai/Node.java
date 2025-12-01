package com.adotematch.ai;

public class Node implements Comparable<Node> {
    private final int id;
    private final double x, y;
    private double g, h, f;
    private Node parent;

    public Node(int id, double x, double y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    // Getters e Setters
    public int getId() { return id; }
    public double getX() { return x; }
    public double getY() { return y; }
    public double getG() { return g; }
    public void setG(double g) { this.g = g; }
    public double getH() { return h; }
    public void setH(double h) { this.h = h; }
    public double getF() { return f; }
    public void setF(double f) { this.f = f; }
    public Node getParent() { return parent; }
    public void setParent(Node parent) { this.parent = parent; }

    @Override
    public int compareTo(Node other) {
        return Double.compare(this.f, other.f);
    }
}