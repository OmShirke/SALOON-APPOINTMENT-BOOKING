import Saloon from "../models/Saloon.js";

export const createSaloon = async (req, res, next) => {
  const newSaloon = new Saloon(req.body);

  try {
    const savedSaloon = await newSaloon.save();
    res.status(200).json(savedSaloon);
  } catch (err) {
    next(err);
  }
};

export const updateSaloon = async (req, res, next) => {
  try {
    const updatedSaloon = await Saloon.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSaloon);
  } catch (err) {
    next(err);
  }
};

export const deleteSaloon = async (req, res, next) => {
  try {
    await Saloon.findByIdAndDelete(req.params.id);
    res.status(200).json("saloon has been deleted. ");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSaloon = async (req, res, next) => {
  try {
    await Saloon.findById(req.params.id);
    res.status(200).json(Saloon);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSaloons = async (req, res, next) => {
  try {
    const Saloons = await Saloon.find();
    res.status(200).json(Saloons);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Saloon.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
