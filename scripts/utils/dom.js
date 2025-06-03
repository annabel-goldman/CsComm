/**
 * DOM Utility Functions
 * @module dom
 */

/**
 * Creates a new DOM element with specified attributes and children
 * @param {string} tag - The HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|Node|Array} children - Child elements or text content
 * @returns {HTMLElement} The created element
 */
export function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });

    // Add children
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Node) {
        element.appendChild(children);
    } else if (Array.isArray(children)) {
        children.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
        });
    }

    return element;
}

/**
 * Finds an element by selector and throws if not found
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [parent=document] - Parent element to search within
 * @returns {HTMLElement} The found element
 * @throws {Error} If element is not found
 */
export function getElement(selector, parent = document) {
    const element = parent.querySelector(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
}

/**
 * Finds all elements matching a selector
 * @param {string} selector - CSS selector
 * @param {HTMLElement} [parent=document] - Parent element to search within
 * @returns {NodeList} The found elements
 */
export function getElements(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Adds event listeners to multiple elements
 * @param {string} selector - CSS selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {HTMLElement} [parent=document] - Parent element to search within
 */
export function addEventListeners(selector, event, handler, parent = document) {
    parent.querySelectorAll(selector).forEach(element => {
        element.addEventListener(event, handler);
    });
} 