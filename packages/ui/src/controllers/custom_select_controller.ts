import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['input', 'trigger', 'label', 'listbox', 'search'];
    static values = {
        placeholder: { type: String, default: 'Select...' },
        multiple: { type: Boolean, default: false },
        searchable: { type: Boolean, default: false },
    };

    declare readonly inputTarget: HTMLInputElement;
    declare readonly triggerTarget: HTMLButtonElement;
    declare readonly labelTarget: HTMLElement;
    declare readonly listboxTarget: HTMLElement;
    declare readonly searchTarget: HTMLInputElement;
    declare readonly hasInputTarget: boolean;
    declare readonly hasLabelTarget: boolean;
    declare readonly hasListboxTarget: boolean;
    declare readonly hasSearchTarget: boolean;

    declare placeholderValue: string;
    declare multipleValue: boolean;
    declare searchableValue: boolean;

    private options: HTMLElement[] = [];
    private visibleOptions: HTMLElement[] = [];
    private selectedOptions: Set<HTMLElement> = new Set();
    private activeIndex = -1;
    private keydownHandler!: (event: KeyboardEvent) => void;

    connect(): void {
        this.options = Array.from(this.listboxTarget.querySelectorAll('[role="option"]'));
        this.visibleOptions = [...this.options];
        this.keydownHandler = this.handleKeydown.bind(this);
        this.triggerTarget.addEventListener('keydown', this.keydownHandler);

        // Initialize from hidden input value
        this.initializeSelection();

        // Set up option click handlers
        this.listboxTarget.addEventListener('click', this.handleOptionClick.bind(this));
        this.listboxTarget.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.listboxTarget.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    disconnect(): void {
        this.triggerTarget.removeEventListener('keydown', this.keydownHandler);
    }

    private initializeSelection(): void {
        if (this.multipleValue) {
            try {
                const parsed = JSON.parse(this.inputTarget.value || '[]');
                const values = Array.isArray(parsed) ? parsed : [];
                values.forEach((val: string) => {
                    const option = this.options.find((opt) => this.getValue(opt) === val);
                    if (option) this.selectedOptions.add(option);
                });
                this.updateLabel();
            } catch {
                // Fallback to aria-selected
                this.options.forEach((opt) => {
                    if (opt.getAttribute('aria-selected') === 'true') {
                        this.selectedOptions.add(opt);
                    }
                });
                this.updateLabel();
            }
        } else {
            const initialOption =
                this.options.find((opt) => this.getValue(opt) === this.inputTarget.value) ||
                this.options.find((opt) => opt.getAttribute('aria-selected') === 'true');
            if (initialOption) {
                this.selectOption(initialOption, false);
            }
        }
    }

    private getValue(option: HTMLElement): string {
        return option.dataset.value ?? option.textContent?.trim() ?? '';
    }

    private getLabel(option: HTMLElement): string {
        return option.dataset.label ?? option.textContent?.trim() ?? '';
    }

    private updateLabel(): void {
        if (!this.hasLabelTarget) return;

        if (this.multipleValue) {
            const selected = this.options.filter((opt) => this.selectedOptions.has(opt));
            if (selected.length === 0) {
                this.labelTarget.textContent = this.placeholderValue;
                this.labelTarget.classList.add('text-muted-foreground');
            } else {
                this.labelTarget.textContent = selected.map((opt) => this.getLabel(opt)).join(', ');
                this.labelTarget.classList.remove('text-muted-foreground');
            }
        } else {
            const selected = this.options.find((opt) => opt.getAttribute('aria-selected') === 'true');
            if (selected) {
                this.labelTarget.textContent = this.getLabel(selected);
                this.labelTarget.classList.remove('text-muted-foreground');
            } else {
                this.labelTarget.textContent = this.placeholderValue;
                this.labelTarget.classList.add('text-muted-foreground');
            }
        }
    }

    private selectOption(option: HTMLElement, triggerEvent = true): void {
        if (this.multipleValue) {
            if (this.selectedOptions.has(option)) {
                this.selectedOptions.delete(option);
                option.removeAttribute('aria-selected');
            } else {
                this.selectedOptions.add(option);
                option.setAttribute('aria-selected', 'true');
            }

            const values = this.options
                .filter((opt) => this.selectedOptions.has(opt))
                .map((opt) => this.getValue(opt));
            this.inputTarget.value = JSON.stringify(values);
        } else {
            // Clear previous selection
            this.options.forEach((opt) => opt.removeAttribute('aria-selected'));
            option.setAttribute('aria-selected', 'true');
            this.inputTarget.value = this.getValue(option);
        }

        this.updateLabel();

        if (triggerEvent) {
            this.dispatch('change', {
                detail: {
                    value: this.multipleValue
                        ? this.options.filter((opt) => this.selectedOptions.has(opt)).map((opt) => this.getValue(opt))
                        : this.getValue(option),
                },
            });
        }

        if (!this.multipleValue) {
            this.closePopover();
        }
    }

    private setActiveOption(index: number): void {
        // Remove active from all options
        this.options.forEach((opt) => opt.classList.remove('active'));

        this.activeIndex = index;

        if (this.activeIndex > -1 && this.visibleOptions[this.activeIndex]) {
            const activeOption = this.visibleOptions[this.activeIndex];
            activeOption.classList.add('active');
            if (activeOption.id) {
                this.triggerTarget.setAttribute('aria-activedescendant', activeOption.id);
            } else {
                this.triggerTarget.removeAttribute('aria-activedescendant');
            }
        } else {
            this.triggerTarget.removeAttribute('aria-activedescendant');
        }
    }

    private handleOptionClick(event: Event): void {
        const target = event.target as HTMLElement;
        const option = target.closest('[role="option"]') as HTMLElement | null;
        if (!option || !this.options.includes(option)) return;
        if (option.getAttribute('aria-hidden') === 'true') return;

        this.selectOption(option);
        this.setActiveOption(this.visibleOptions.indexOf(option));

        if (this.multipleValue && this.hasSearchTarget) {
            this.searchTarget.focus();
        } else if (this.multipleValue) {
            this.triggerTarget.focus();
        }
    }

    private handleMouseMove(event: Event): void {
        const target = event.target as HTMLElement;
        const option = target.closest('[role="option"]') as HTMLElement | null;
        if (option && this.visibleOptions.includes(option)) {
            const index = this.visibleOptions.indexOf(option);
            if (index !== this.activeIndex) {
                this.setActiveOption(index);
            }
        }
    }

    private handleMouseLeave(): void {
        const selectedOption = this.listboxTarget.querySelector(
            '[role="option"][aria-selected="true"]:not([aria-hidden="true"])'
        );
        if (selectedOption && this.visibleOptions.includes(selectedOption as HTMLElement)) {
            this.setActiveOption(this.visibleOptions.indexOf(selectedOption as HTMLElement));
        } else {
            this.setActiveOption(-1);
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const isPopoverOpen = this.isPopoverOpen();

        if (!['ArrowDown', 'ArrowUp', 'Enter', 'Home', 'End', 'Escape', ' '].includes(event.key)) {
            return;
        }

        if (!isPopoverOpen) {
            if (event.key !== 'Escape') {
                event.preventDefault();
                this.openPopover();
            }
            return;
        }

        event.preventDefault();

        if (event.key === 'Escape') {
            this.closePopover();
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            if (this.activeIndex > -1 && this.visibleOptions[this.activeIndex]) {
                this.selectOption(this.visibleOptions[this.activeIndex]);
            }
            return;
        }

        if (this.visibleOptions.length === 0) return;

        let nextIndex = this.activeIndex;

        switch (event.key) {
            case 'ArrowDown':
                if (this.activeIndex < this.visibleOptions.length - 1) {
                    nextIndex = this.activeIndex + 1;
                } else if (this.activeIndex === -1) {
                    nextIndex = 0;
                }
                break;
            case 'ArrowUp':
                if (this.activeIndex > 0) {
                    nextIndex = this.activeIndex - 1;
                } else if (this.activeIndex === -1) {
                    nextIndex = 0;
                }
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = this.visibleOptions.length - 1;
                break;
        }

        if (nextIndex !== this.activeIndex) {
            this.setActiveOption(nextIndex);
            this.visibleOptions[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    // Public action for search input keydown
    handleSearchKeydown(event: KeyboardEvent): void {
        if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
            this.handleKeydown(event);
        }
    }

    // Public action for filtering
    filter(): void {
        if (!this.hasSearchTarget) return;

        const searchTerm = this.searchTarget.value.trim().toLowerCase();

        this.setActiveOption(-1);
        this.visibleOptions = [];

        this.options.forEach((option) => {
            const optionText = (option.dataset.filter || option.textContent || '').trim().toLowerCase();
            const keywordList = (option.dataset.keywords || '')
                .toLowerCase()
                .split(/[\s,]+/)
                .filter(Boolean);
            const matchesKeyword = keywordList.some((keyword) => keyword.includes(searchTerm));
            const matches = searchTerm === '' || optionText.includes(searchTerm) || matchesKeyword;

            option.setAttribute('aria-hidden', String(!matches));

            if (matches) {
                this.visibleOptions.push(option);
            }
        });

        // Also hide/show groups based on whether they have visible options
        const groups = this.listboxTarget.querySelectorAll('[role="group"]');
        groups.forEach((group) => {
            const visibleOptionsInGroup = group.querySelectorAll('[role="option"]:not([aria-hidden="true"])');
            if (visibleOptionsInGroup.length === 0) {
                (group as HTMLElement).style.display = 'none';
            } else {
                (group as HTMLElement).style.display = '';
            }
        });
    }

    private resetFilter(): void {
        if (this.hasSearchTarget) {
            this.searchTarget.value = '';
        }
        this.visibleOptions = [...this.options];
        this.options.forEach((opt) => opt.removeAttribute('aria-hidden'));

        // Show all groups again
        const groups = this.listboxTarget.querySelectorAll('[role="group"]');
        groups.forEach((group) => {
            (group as HTMLElement).style.display = '';
        });
    }

    private isPopoverOpen(): boolean {
        const popover = this.element.querySelector('[data-controller="popover"]');
        if (!popover) return false;
        const content = popover.querySelector('[data-popover-target="content"]');
        return content?.getAttribute('aria-hidden') === 'false';
    }

    private openPopover(): void {
        const popover = this.element.querySelector('[data-controller="popover"]');
        if (!popover) return;

        const popoverController = this.application.getControllerForElementAndIdentifier(popover, 'popover');
        if (popoverController && typeof (popoverController as any).open === 'function') {
            (popoverController as any).open();

            // Focus search input if searchable
            if (this.searchableValue && this.hasSearchTarget) {
                setTimeout(() => {
                    this.searchTarget.focus();
                }, 50);
            }

            // Set active option to currently selected
            const selectedOption = this.listboxTarget.querySelector(
                '[role="option"][aria-selected="true"]:not([aria-hidden="true"])'
            );
            if (selectedOption && this.visibleOptions.includes(selectedOption as HTMLElement)) {
                this.setActiveOption(this.visibleOptions.indexOf(selectedOption as HTMLElement));
                selectedOption.scrollIntoView({ block: 'nearest' });
            }
        }
    }

    private closePopover(): void {
        const popover = this.element.querySelector('[data-controller="popover"]');
        if (!popover) return;

        const popoverController = this.application.getControllerForElementAndIdentifier(popover, 'popover');
        if (popoverController && typeof (popoverController as any).close === 'function') {
            (popoverController as any).close();
        }

        this.setActiveOption(-1);
        this.resetFilter();
    }

    // Public API
    select(value: string): void {
        const option = this.options.find((opt) => this.getValue(opt) === value);
        if (option) {
            this.selectOption(option);
        }
    }

    clear(): void {
        if (this.multipleValue) {
            this.selectedOptions.clear();
            this.options.forEach((opt) => opt.removeAttribute('aria-selected'));
            this.inputTarget.value = '[]';
        } else {
            this.options.forEach((opt) => opt.removeAttribute('aria-selected'));
            this.inputTarget.value = '';
        }
        this.updateLabel();
        this.dispatch('change', { detail: { value: this.multipleValue ? [] : '' } });
    }
}
