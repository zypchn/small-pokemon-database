CREATE DATABASE pokemon;

create table pokemons (
	dbID int primary key auto_increment,
    pokedexID int not null unique,
    pokemonName varchar(100) not null,
    type enum("Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground",
    "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy")
);

CREATE TABLE trainers (
	trainerID int auto_increment primary key,
    trainerName varchar(100) not null,
	trainerRegion enum("Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea") not null
);
    
CREATE TABLE gyms (
	gymID int auto_increment primary key,
    gymName varchar(200) not null,
	gymRegion enum("Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea") not null
);

create table trainer_pokemons (
	trainerID int,
    pokemonID int,
    foreign key (trainerID) references trainers(trainerID),
    foreign key (pokemonID) references pokemons(dbID)
);

create table admins (
	adminID int primary key auto_increment,
    adminUsername varchar(255) not null,
    adminPassword varchar(255) not null
);

create table pokemon_logs (
	logID int primary key auto_increment,
    logEvent varchar(255)
);

create view pokemon_decks as select pokemonName, trainerID from pokemons inner join trainer_pokemons on trainer_pokemons.pokemonID = pokemons.pokedexID;

DELIMITER //
CREATE FUNCTION CanAddPokemon(trainerID INT) RETURNS BOOLEAN
deterministic
BEGIN
  DECLARE deckCount INT;
  SELECT COUNT(*) INTO deckCount FROM trainer_pokemon WHERE trainerID = trainerID;
  RETURN entryCount <= 6;
END //
DELIMITER ;

delimiter //
create procedure deletePokemon (in pokemonID int)
begin
	delete from pokemons where dbID = pokemonID;
end //

delimiter //
create procedure deleteTrainer (in trainerID int)
begin
	delete from trainers where trainerID = trainerID;
end //

delimiter //
create procedure deleteGym (in gymID int)
begin
	delete from gyms where gymID = gymID;
end //

delimiter //
create trigger add_pokemon_trigger after insert on pokemons
for each row
begin
	insert into pokemon_logs (logEvent) values(concat(new.pokemonName, " added."));
end//