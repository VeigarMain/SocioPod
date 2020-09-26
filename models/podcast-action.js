// Creating our Podcast Action model
module.exports = function (sequelize, DataTypes) {
  const PodcastAction = sequelize.define("PodcastAction", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  return PodcastAction;
};
