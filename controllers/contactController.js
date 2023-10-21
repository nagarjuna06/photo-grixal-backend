import { InternalServerError } from "../request-errors/index.js";

export const addContact = async (req, res) => {
  try {
    await req.model.updateOne(
      { _id: req.user.id },
      { $addToSet: { contacts: req.body.contactId } }
    );
    res.json({ msg: "contact added Successfully!" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const contactList = async (req, res) => {
  try {
    const contacts = await req.model
      .findById(req.user.id, { contacts: 1, _id: 0 })
      .populate({ path: "contacts", select: { name: 1, avatar: 1, _id: 1 } });
    res.json(contacts.contacts);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    await req.model.updateOne(
      { _id: req.user.id },
      { $pull: { contacts: req.body.contactId } }
    );
    res.json({ msg: "contact deleted successfully!" });
  } catch (error) {
    InternalServerError(res, error.message);
  }
};
