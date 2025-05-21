export { ChatHandler, chat_names };

const chat_names = [
    "Jethalal Gada",
    "Taarak Mehta",
    "Champaklal Gada",
    "Daya Bhabhi",
    "Bhide Master",
    "Popatlal",
    "Babita Ji"
];

const chat_messages = [
    "Please review the attached document and provide feedback.",
    "Looking forward to our meeting scheduled for 3 PM.",
    "Kindly let me know if any clarification is needed.",
    "The proposal has been approved. Let's proceed with implementation."
];

const chat_img_count = 7;

class ChatHandler {
    constructor(chat_template, chat_list) {
        this.map = new Map(); // Replaces hashmap object
        this.linked_list = null;
        this.chat_template = chat_template;
        this.chat_list = chat_list;

        const clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime() {
        this.mins += 1;
        if (this.mins === 60) {
            this.hours += 1;
            this.mins = 0;
        }
        if (this.hours === 24) {
            this.hours = 0;
        }
        return ("0" + this.hours).slice(-2) + ":" + ("0" + this.mins).slice(-2);
    }

    createNode(id) {
        const node = { prev: null, next: null };
        const chat_item = this.chat_template.cloneNode(true);

        chat_item.querySelector('.Name').innerText = chat_names[id % chat_names.length];
        chat_item.querySelector('.Message').innerText = chat_messages[id % chat_messages.length];
        chat_item.querySelector('.Image').src = `./images/avatar${1 + (id % chat_img_count)}.png`;

        node.chat_item = chat_item;
        return node;
    }

    newMsg(id) {
        let node;
        if (!this.map.has(id)) {
            node = this.createNode(id);
            this.map.set(id, node);
        } else {
            node = this.getNodeFromList(id);
        }

        if (this.linked_list === null) {
            this.linked_list = node;
        } else {
            node.next = this.linked_list;
            if (this.linked_list) this.linked_list.prev = node;
            this.linked_list = node;
        }

        this.updateList();
    }

    deleteMsg(id) {
        const node = this.getNodeFromList(id);
        this.map.delete(id);
        this.updateList();
    }

    getNodeFromList(id) {
        const node = this.map.get(id);
        const prevNode = node.prev;
        const nextNode = node.next;

        if (prevNode) prevNode.next = nextNode;
        if (nextNode) nextNode.prev = prevNode;
        if (node === this.linked_list) this.linked_list = nextNode;

        node.next = null;
        node.prev = null;

        return node;
    }

    updateList() {
        let html = '';
        let head = this.linked_list;
        while (head !== null) {
            const element = head.chat_item;
            element.className = head === this.linked_list ? "ks-item ks-active" : "ks-item";
            element.querySelector('.Time').innerText = this.getTime();
            html += element.outerHTML;
            head = head.next;
        }
        this.chat_list.innerHTML = html;
    }
}
