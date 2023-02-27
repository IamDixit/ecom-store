module.exports = class BaseRepository {
  constructor() {}
  async add(info) {
    const model = this.model();
    return new model(info);
  }
  async findOne(predicate = null, projection = null, populateBy = null) {
    const model = this.model();
    if (populateBy) {
      if (projection) {
        return await model
          .findOne(predicate, projection)
          .populate(populateBy)
          .lean();
      } else {
        return await model.findOne(predicate).populate(populateBy).lean();
      }
    } else {
      if (projection) {
        return await model.findOne(predicate, projection).lean();
      } else {
        return await model.findOne(predicate).lean();
      }
    }
  }
  async find(
    predicate = null,
    projection = null,
    populateBy = null,
    sortQuery = {}
  ) {
    const model = this.model();
    if (populateBy) {
      if (projection) {
        return await model
          .find(predicate, projection)
          .sort(sortQuery)
          .populate(populateBy)
          .lean();
      } else {
        return await model
          .find(predicate)
          .sort(sortQuery)
          .populate(populateBy)
          .lean();
      }
    } else {
      if (projection) {
        return await model.find(predicate, projection).sort(sortQuery);
      } else {
        return await model.find(predicate).sort(sortQuery);
      }
    }
  }
  async update(predicate, info, options = null) {
    const model = this.model();
    return await model.updateOne(predicate, info, options);
  }
  async updateMany(predicate, info, options = null) {
    const model = this.model();
    return await model.updateMany(predicate, info, options);
  }
  async deleteOne(predicate) {
    const model = this.model();
    return await model.deleteOne(predicate);
  }
  async deleteMany(predicate) {
    const model = this.model();
    return await model.deleteMany(predicate);
  }
  async insertMany(data) {
    const model = this.model();
    return await model.insertMany(data);
  }
};
