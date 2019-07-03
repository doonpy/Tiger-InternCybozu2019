let ListData = [
    {id:1, name: 'Dog', status: 'available'},
    {id: 2, name: 'Cat', status: 'available'},
    {id: 3, name: 'Rabbit', status: 'available'}
];
module.exports.find = (callback) => {
    callback(null, ListData);
};
module.exports.findById = (id, callback) => {
    callback(null, ListData.find(item => item.id == id)); // typeof id === "string"
};
module.exports.save = (pet, callback) => {
    let {name, status} = pet;
    if (!name && !status) {
        callback("Pet is invalid");
        return;
    }
    pet = {
        id: Date.now(),
        name,
        status
    };
    ListData.push(pet);
    callback(null, pet);
};
module.exports.delete = (id, callback) => {
    let roweffected = ListData.length;
    ListData = ListData.filter(item => item.id != id);
    roweffected = roweffected - ListData.length;
    callback(null, {roweffected})
};
module.exports.update = (id, pet, callback) => {
    let oldPet = ListData.find(item => item.id == id);
    if (!oldPet) {
        callback("Pet not found!");
        return;
    }
    let index = ListData.indexOf(oldPet);
    Object.assign(oldPet, pet);
    ListData.fill(oldPet, index, ++index);
    callback(null, oldPet);
};