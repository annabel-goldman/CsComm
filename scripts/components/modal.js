import { createElement, getElement, addEventListeners } from '../utils/dom.js';

/**
 * Modal Component
 * @class
 * @description Handles modal functionality including opening, closing, and content management
 */
export class Modal {
    /**
     * @param {Object} options - Modal configuration options
     * @param {string} options.title - Modal title
     * @param {string|HTMLElement} options.content - Modal content
     * @param {Function} [options.onClose] - Callback function when modal is closed
     */
    constructor(options = {}) {
        this.options = options;
        this.isOpen = false;
        this.createModalElement();
        this.init();
    }

    /**
     * Create the modal element
     * @private
     */
    createModalElement() {
        if (!document.querySelector('.modal')) {
            const modalHtml = `
                <div class="modal">
                    <div class="modal-content">
                        <button class="close-modal" aria-label="Close modal">&times;</button>
                        <h4 class="modal-title"></h4>
                        <div class="modal-body"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
    }

    /**
     * Initialize the modal component
     * @private
     * @throws {Error} If modal elements cannot be initialized
     */
    init() {
        try {
            this.modal = document.querySelector('.modal');
            this.modalContent = this.modal.querySelector('.modal-content');
            this.modalTitle = this.modal.querySelector('.modal-title');
            this.modalBody = this.modal.querySelector('.modal-body');
            this.closeButton = this.modal.querySelector('.close-modal');
            this.setupEventListeners();
        } catch (error) {
            throw new Error('Failed to initialize modal elements: ' + error.message);
        }
    }

    /**
     * Set up event listeners for the modal
     * @private
     */
    setupEventListeners() {
        this.closeButton.addEventListener('click', () => this.close());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Open the modal with specified content
     * @param {Object} [options] - Override default options
     * @throws {Error} If modal is not initialized
     */
    open(options = {}) {
        if (!this.modal) {
            throw new Error('Modal not initialized');
        }

        const settings = { ...this.options, ...options };
        
        this.modalTitle.textContent = settings.title || '';
        
        if (typeof settings.content === 'string') {
            this.modalBody.innerHTML = settings.content;
        } else if (settings.content instanceof HTMLElement) {
            this.modalBody.innerHTML = '';
            this.modalBody.appendChild(settings.content);
        }

        // Add animation class
        this.modalContent.classList.add('modal-in');
        this.modal.style.display = 'block';
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the modal
     * @throws {Error} If modal is not initialized
     */
    close() {
        if (!this.modal) {
            throw new Error('Modal not initialized');
        }

        // Remove animation class
        this.modalContent.classList.remove('modal-in');
        this.modal.style.display = 'none';
        this.isOpen = false;
        document.body.style.overflow = '';
        
        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    /**
     * Update modal content
     * @param {string|HTMLElement} content - New content to display
     * @throws {Error} If modal is not initialized
     */
    updateContent(content) {
        if (!this.modal) {
            throw new Error('Modal not initialized');
        }

        if (typeof content === 'string') {
            this.modalBody.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.modalBody.innerHTML = '';
            this.modalBody.appendChild(content);
        }
    }
} 